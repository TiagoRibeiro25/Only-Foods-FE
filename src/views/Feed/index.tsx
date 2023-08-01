import { useCallback, useContext, useEffect, useState } from 'react';
import requests from '../../api/requests';
import LoadingIcon from '../../assets/icons/loading.svg';
import Post from '../../components/Post';
import Reveal from '../../components/Reveal';
import Select from '../../components/Select';
import { ThoughtsContext } from '../../contextProviders/ThoughtsContext';
import { UserContext } from '../../contextProviders/UserContext';
import { getLocalStorage, setLocalStorage } from '../../utils/useLocalStorage';
import NewThoughtForm, { NewThought } from './components/NewThoughtForm';

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
	const [filter, setFilter] = useState<Filter>(getFilterFromLocalStorage());

	const thoughtsContext = useContext(ThoughtsContext);
	const { loggedUser } = useContext(UserContext);
	const [isLoading, setIsLoading] = useState(false);

	// Function to fetch more thoughts and update the state
	const fetchMoreThoughts = useCallback(async () => {
		// Prevent making duplicate requests while loading or if reached the end
		if (isLoading || thoughtsContext[filter].reachedEnd) {
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
						<Post key={thought.id} {...thought} />
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
				{thoughtsContext[filter].reachedEnd && (
					<Reveal width="100%" animation="slide-bottom" delay={0.05}>
						<div className="flex flex-col items-center justify-center gap-2 pt-8 pb-12 text-center col-span-full md:pb-6">
							<svg
								fill="#878d98"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
								className="w-14 text-primary-text-color dark:text-primary-text-color "
							>
								<path d="M4 2v18H3v2h4v-2H6v-5h13a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H6V2H4zm4 3v2h2V5h2v2h2V5h2v2h2v2h-2v2h2v2h-2v-2h-2v2h-2v-2h-2v2H8v-2H6V9h2V7H6V5h2z"></path>
								<path d="M8 9h2v2H8zm4 0h2v2h-2zm-2-2h2v2h-2zm4 0h2v2h-2z"></path>
							</svg>
							<p className="text-primary-text-color dark:text-primary-text-color ">
								You have reached the end.
							</p>
						</div>
					</Reveal>
				)}
				{!isLoading && thoughtsContext[filter].thoughts.length === 0 && (
					<Reveal width="100%" animation="slide-bottom" delay={0.3}>
						<div className="flex flex-col items-center justify-center gap-2 pt-8 pb-12 text-center col-span-full md:pb-6">
							<svg
								fill="#878d98"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
								className="w-14 text-primary-text-color dark:text-primary-text-color"
							>
								<path d="M4 2v18H3v2h4v-2H6v-5h13a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H6V2H4zm4 3v2h2V5h2v2h2V5h2v2h2v2h-2v2h2v2h-2v-2h-2v2h-2v-2h-2v2H8v-2H6V9h2V7H6V5h2z"></path>
								<path d="M8 9h2v2H8zm4 0h2v2h-2zm-2-2h2v2h-2zm4 0h2v2h-2z"></path>
							</svg>
							<p className="text-primary-text-color dark:text-primary-text-color">
								No thoughts found.
							</p>
							<p className="text-primary-text-color dark:text-primary-text-color">
								Change the filter or add a new thought.
							</p>
						</div>
					</Reveal>
				)}
			</div>
		</div>
	);
};

export default Feed;
