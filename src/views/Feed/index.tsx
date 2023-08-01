import { useCallback, useContext, useEffect, useState } from 'react';
import requests from '../../api/requests';
import LoadingIcon from '../../assets/icons/loading.svg';
import Post from '../../components/Post';
import Reveal from '../../components/Reveal';
import Select from '../../components/Select';
import { ThoughtsContext } from '../../contextProviders/ThoughtsContext';
import { UserContext } from '../../contextProviders/UserContext';
import { getLocalStorage, setLocalStorage } from '../../utils/useLocalStorage';
import ErrorOccurred from './components/ErrorOccurred';
import NewThoughtForm, { NewThought } from './components/NewThoughtForm';
import NoThoughtsFound from './components/NoThoughtsFound';
import ReachedEnd from './components/ReachedEnd';

type Filter = 'recent' | 'popular' | 'following';

const options = [
	{ text: 'Recent', value: 'recent' },
	// TODO: Fix popular filter (duplicate thoughts)
	// { text: 'Most Popular', value: 'popular' },
	{ text: 'Following', value: 'following' },
];

function getFilterFromLocalStorage(): Filter {
	const filter = getLocalStorage('feedThoughtFilter');
	return options.some(option => option.value === filter) ? (filter as Filter) : 'recent';
}

const Feed = () => {
	const thoughtsContext = useContext(ThoughtsContext);
	const { loggedUser } = useContext(UserContext);

	const [filter, setFilter] = useState<Filter>(getFilterFromLocalStorage());
	const [isLoading, setIsLoading] = useState(false);
	const [anErrorOccurred, setAnErrorOccurred] = useState(false);

	// Function to fetch more thoughts and update the state
	const fetchMoreThoughts = useCallback(async () => {
		// Prevent making duplicate requests while loading or if reached the end
		if (isLoading || thoughtsContext[filter].reachedEnd || anErrorOccurred) {
			return;
		}

		setIsLoading(true);

		try {
			const response = await requests.thoughts.getThoughts({
				filter,
				page: thoughtsContext[filter].page,
				limit: 5,
			});

			if (response.data.success) {
				const newThoughts = response.data.data?.thoughts ?? [];

				const totalThoughts = [...thoughtsContext[filter].thoughts, ...newThoughts];

				thoughtsContext[filter].setThoughts(totalThoughts);
				thoughtsContext[filter].incrementPage();

				// Check if reached the end of thoughts to disable further loading
				if (response.data.data?.totalCount === totalThoughts.length) {
					thoughtsContext[filter].setReachedEnd(true);
				}
			} else {
				setAnErrorOccurred(true);
			}
		} catch (error) {
			console.error('Error fetching more thoughts:', error);
		} finally {
			setIsLoading(false);
		}
	}, [filter, isLoading, thoughtsContext]);

	const debounce = <T extends unknown[]>(func: (...args: T) => void, delay: number) => {
		let timer: ReturnType<typeof setTimeout>;
		return (...args: T) => {
			clearTimeout(timer);
			timer = setTimeout(() => func(...args), delay);
		};
	};

	// Create a debounced version of the fetchMoreThoughts function using debounce
	// TODO: Fix React Hook useCallback received a function whose dependencies are unknown. Pass an inline function instead.
	// TODO: Fix Promise returned in function argument where a void return was expected.
	const debouncedFetchMoreThoughts = useCallback(debounce(fetchMoreThoughts, 300), [
		fetchMoreThoughts,
	]);

	const handleNewThought = (newThought: NewThought): void => {
		const thought = {
			id: newThought.id,
			content: newThought.content,
			author: {
				id: newThought.authorId,
				username: loggedUser?.username ?? '',
				userImage: loggedUser?.picture
					? { cloudinaryImage: loggedUser?.picture }
					: undefined,
			},
			likes: 0,
			comments: 0,
			isAuthor: true,
			isLiked: false,
			createdAgo: '0 seconds ago',
			createdAt: newThought.createdAt,
		};

		// Add the new thought to the recent thoughts
		thoughtsContext.recent.setThoughts([thought, ...thoughtsContext.recent.thoughts]);
	};

	const deleteThoughtFromList = (thoughtId: number) => {
		// Remove the thought from the recent thoughts
		thoughtsContext.recent.setThoughts(
			thoughtsContext.recent.thoughts.filter(thought => thought.id !== thoughtId),
		);

		// Remove the thought from the popular thoughts
		thoughtsContext.popular.setThoughts(
			thoughtsContext.popular.thoughts.filter(thought => thought.id !== thoughtId),
		);

		// Remove the thought from the following thoughts
		thoughtsContext.following.setThoughts(
			thoughtsContext.following.thoughts.filter(thought => thought.id !== thoughtId),
		);
	};

	const editThoughtFromList = (thoughtId: number, newContent: string) => {
		// Edit the thought from the recent thoughts
		thoughtsContext.recent.setThoughts(
			thoughtsContext.recent.thoughts.map(thought =>
				thought.id === thoughtId ? { ...thought, content: newContent } : thought,
			),
		);

		// Edit the thought from the popular thoughts
		thoughtsContext.popular.setThoughts(
			thoughtsContext.popular.thoughts.map(thought =>
				thought.id === thoughtId ? { ...thought, content: newContent } : thought,
			),
		);

		// Edit the thought from the following thoughts
		thoughtsContext.following.setThoughts(
			thoughtsContext.following.thoughts.map(thought =>
				thought.id === thoughtId ? { ...thought, content: newContent } : thought,
			),
		);
	};

	// Attach scroll event listener to load more thoughts when reaching the bottom
	useEffect(() => {
		// Fetch initial thoughts on the first render
		if (thoughtsContext[filter].isInitialLoad) {
			debouncedFetchMoreThoughts();
			thoughtsContext[filter].setIsInitialLoad(false);
			return;
		}

		const handleScroll = () => {
			// When the user scrolls to the bottom (minus 200px), load more thoughts
			if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
				if (!isLoading && thoughtsContext[filter].thoughts.length === 0) {
					return;
				}

				debouncedFetchMoreThoughts(); // Call the debounced version instead
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [debouncedFetchMoreThoughts, filter, isLoading, thoughtsContext]);

	useEffect(() => {
		setLocalStorage('feedThoughtFilter', filter);
	}, [filter]);

	return (
		<div className="flex flex-col items-center max-w-3xl mx-auto mt-28">
			<Reveal width="100%" animation="slide-top" delay={0.05}>
				<NewThoughtForm onSubmit={handleNewThought} />
			</Reveal>

			{/* Filter Thoughts */}
			<Reveal width="100%" animation="slide-right" delay={0.05}>
				<div className="flex justify-end w-full mt-6">
					<div className="w-40">
						<Select
							id="filter-thoughts"
							labelText="Filter Thoughts"
							options={options}
							value={filter}
							onChange={e => setFilter(e.target.value as Filter)}
						/>
					</div>
				</div>
			</Reveal>

			{/* Posts (Thoughts) */}
			<div className="w-full mt-14">
				{thoughtsContext[filter].thoughts.map(thought => (
					<Reveal key={thought.id} width="100%" animation="slide-right" delay={0.05}>
						<Post
							key={thought.id}
							isAdmin={loggedUser?.isAdmin ?? false}
							isBlocked={loggedUser?.isBlocked ?? false}
							thought={thought}
							onDelete={deleteThoughtFromList}
							onEdit={editThoughtFromList}
						/>
					</Reveal>
				))}
				{isLoading && (
					<div className="flex items-center justify-center">
						<img
							src={LoadingIcon}
							alt="Loading Icon"
							className="ml-1 mr-2 animate-spin"
							width={35}
							height={35}
						/>
					</div>
				)}
				{thoughtsContext[filter].reachedEnd && <ReachedEnd />}
				{anErrorOccurred && thoughtsContext[filter].thoughts.length !== 0 && (
					<ErrorOccurred />
				)}
				{!isLoading && thoughtsContext[filter].thoughts.length === 0 && (
					<NoThoughtsFound />
				)}
			</div>
		</div>
	);
};

export default Feed;
