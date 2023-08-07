import classNames from 'classnames';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import requests from '../../api/requests';
import ErrorOccurred from '../../components/ErrorOccurred';
import Loading from '../../components/Loading';
import NoItemsFound from '../../components/NoItemsFound';
import ReachedEnd from '../../components/ReachedEnd';
import Reveal from '../../components/Reveal';
import Select from '../../components/Select';
import Thought from '../../components/Thought';
import { ThoughtsContext } from '../../contextProviders/ThoughtsContext';
import { UserContext } from '../../contextProviders/UserContext';
import { getLocalStorage, setLocalStorage } from '../../utils/useLocalStorage';
import NewThoughtForm from './components/NewThoughtForm';
import { Filter } from './types';

const options = [
	{ text: 'Recent', value: 'recent' },
	{ text: 'Most Popular', value: 'popular' },
	{ text: 'Following', value: 'following' },
];

function getFilterFromLocalStorage(isUserLogged: boolean): Filter {
	const filter = getLocalStorage('feedThoughtFilter');
	const result = options.some(option => option.value === filter)
		? (filter as Filter)
		: 'recent';

	return result === 'following' && !isUserLogged ? 'recent' : result;
}

const Feed = () => {
	const thoughtsContext = useContext(ThoughtsContext);
	const { loggedUser } = useContext(UserContext);

	const [filter, setFilter] = useState<Filter>(getFilterFromLocalStorage(!!loggedUser));
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [anErrorOccurred, setAnErrorOccurred] = useState<boolean>(false);

	const loadingRef = useRef<boolean>(false);
	const anErrorOccurredRef = useRef<boolean>(false);

	// Function to fetch more thoughts and update the state
	const fetchMoreThoughts = useCallback(async () => {
		// Prevent making duplicate requests while loading or if reached the end
		if (
			loadingRef.current ||
			thoughtsContext[filter].reachedEnd ||
			anErrorOccurredRef.current
		) {
			return;
		}

		loadingRef.current = true;
		setIsLoading(true);

		try {
			const response = await requests.thoughts.getThoughts({
				filter,
				page: thoughtsContext[filter].page,
				limit: 5,
			});

			if (response.data.success) {
				const newThoughts = response.data.data?.thoughts ?? [];

				// Check if there are duplicate thoughts
				const duplicateThoughts = newThoughts.filter(newThought =>
					thoughtsContext[filter].thoughts.some(thought => thought.id === newThought.id),
				);

				// Remove the duplicate thoughts from the new thoughts
				const filteredNewThoughts = newThoughts.filter(
					newThought => !duplicateThoughts.includes(newThought),
				);

				const totalThoughts = [
					...thoughtsContext[filter].thoughts,
					...filteredNewThoughts,
				];

				thoughtsContext[filter].setThoughts(totalThoughts);
				thoughtsContext[filter].incrementPage();

				// Check if reached the end of thoughts to disable further loading
				if (response.data.data?.totalCount === totalThoughts.length) {
					thoughtsContext[filter].setReachedEnd(true);
				}
			} else {
				// if the response was an 404 and there are thoughts in the list, then it reached the end
				if (response.status === 404 && thoughtsContext[filter].thoughts.length > 0) {
					thoughtsContext[filter].setReachedEnd(true);
					return;
				}

				anErrorOccurredRef.current = true;
			}
		} catch (error) {
			console.log('Error fetching more thoughts:', error);
			anErrorOccurredRef.current = true;
			setAnErrorOccurred(true);
		} finally {
			loadingRef.current = false;
			setIsLoading(false);
		}
	}, [filter, thoughtsContext]);

	// Attach scroll event listener to load more thoughts when reaching the bottom
	useEffect(() => {
		// Fetch initial thoughts on the first render
		if (thoughtsContext[filter].isInitialLoad) {
			fetchMoreThoughts();
			thoughtsContext[filter].setIsInitialLoad(false);
			return;
		}

		const handleScroll = () => {
			// When the user scrolls to the bottom (minus 200px), load more thoughts
			if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
				fetchMoreThoughts();
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [filter, fetchMoreThoughts, thoughtsContext]);

	useEffect(() => {
		setLocalStorage('feedThoughtFilter', filter);
		anErrorOccurredRef.current = false;
		setAnErrorOccurred(false);
	}, [filter]);

	return (
		<div className="flex flex-col items-center max-w-3xl mx-auto mt-28">
			{/* Add New Thought Form */}
			{loggedUser && (
				<Reveal width="100%" animation="slide-top" delay={0.05}>
					<NewThoughtForm />
				</Reveal>
			)}

			{/* Filter Thoughts */}
			<Reveal
				width="100%"
				animation={loggedUser ? 'slide-left' : 'slide-top'}
				delay={0.05}
			>
				<div
					className={classNames('flex justify-end w-full', loggedUser ? 'mt-6' : 'mt-0')}
				>
					<div className="w-40">
						<Select
							id="filter-thoughts"
							labelText="Filter Thoughts"
							options={loggedUser ? options : options.slice(0, 2)}
							value={filter}
							onChange={e => setFilter(e.target.value as Filter)}
						/>
					</div>
				</div>
			</Reveal>

			{/* Thoughts */}
			<div className="w-full mt-14">
				{thoughtsContext[filter].thoughts.map(thought => (
					<Reveal key={thought.id} width="100%" animation="slide-right" delay={0.05}>
						<Thought
							key={thought.id}
							isAdmin={loggedUser?.isAdmin ?? false}
							isBlocked={loggedUser?.isBlocked ?? false}
							thought={thought}
						/>
					</Reveal>
				))}

				{isLoading && <Loading />}
				{thoughtsContext[filter].reachedEnd && <ReachedEnd />}
				{anErrorOccurred && thoughtsContext[filter].thoughts.length !== 0 && (
					<ErrorOccurred text="An error occurred while fetching thoughts." />
				)}
				{!isLoading && thoughtsContext[filter].thoughts.length === 0 && (
					<NoItemsFound
						warning="No thoughts found."
						message="Change the filter or add a new thought."
					/>
				)}
			</div>
		</div>
	);
};

export default Feed;
