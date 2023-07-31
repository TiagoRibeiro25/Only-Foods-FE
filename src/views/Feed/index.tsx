import { useCallback, useEffect, useState } from 'react';
import requests from '../../api/requests';
import LoadingIcon from '../../assets/icons/loading.svg';
import Post from '../../components/Post';
import Reveal from '../../components/Reveal';
import Select from '../../components/Select';
import { getLocalStorage, setLocalStorage } from '../../utils/useLocalStorage';
import NewThoughtForm from './components/NewThoughtForm';

type Filter = 'recent' | 'popular' | 'following';

interface Thought {
	id: number;
	content: string;
	author: {
		id: number;
		username: string;
		userImage?: {
			cloudinaryImage: string;
		};
	};
	likes: number;
	comments: number;
	isAuthor: boolean;
	isLiked: boolean;
	createdAgo: string;
	createdAt: string;
}

const options = [
	{ text: 'Recent', value: 'recent' },
	{ text: 'Most Popular', value: 'popular' },
	{ text: 'Following', value: 'following' },
];

const Feed = () => {
	const [filter, setFilter] = useState<Filter>(
		getLocalStorage('feedThoughtFilter') ?? 'recent',
	);
	const [thoughts, setThoughts] = useState<Thought[]>([]);
	const [page, setPage] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [reachedEnd, setReachedEnd] = useState(false);
	const [isInitialLoad, setIsInitialLoad] = useState(true);
	const [shouldRefetch, setShouldRefetch] = useState(false);

	// Function to fetch more thoughts and update the state
	const fetchMoreThoughts = useCallback(async () => {
		if (isLoading || reachedEnd) return; // Prevent making duplicate requests while loading

		setIsLoading(true);
		try {
			const response = await requests.thoughts.getThoughts({
				filter,
				page: page + 1,
				limit: 5,
			});

			if (response.data.success) {
				const newThoughts = response.data.data?.thoughts ?? [];
				setThoughts(prevThoughts => [...prevThoughts, ...newThoughts]);
				setPage(prevPage => prevPage + 1);

				// Check if reached the end of thoughts to disable further loading
				if (response.data.data?.totalCount === thoughts.length + newThoughts.length) {
					setReachedEnd(true);
				}
			}
		} catch (error) {
			console.error('Error fetching more thoughts:', error);
		} finally {
			setIsLoading(false);
		}
	}, [filter, isLoading, page, reachedEnd, thoughts.length]);

	// Custom debouncing function inside the Feed component to prevent rapid requests
	const debounce = <T extends unknown[]>(func: (...args: T) => void, delay: number) => {
		let timer: ReturnType<typeof setTimeout>;
		return (...args: T) => {
			clearTimeout(timer);
			timer = setTimeout(() => func(...args), delay);
		};
	};

	// Create a debounced version of the fetchMoreThoughts function using debounce
	// TODO: Fix linting errors:
	// (React Hook useCallback received a function whose dependencies are unknown. Pass an inline function instead)
	// (Promise returned in function argument where a void return was expected.)
	const debouncedFetchMoreThoughts = useCallback(debounce(fetchMoreThoughts, 300), [
		fetchMoreThoughts,
	]);

	// Attach scroll event listener to load more thoughts when reaching the bottom
	useEffect(() => {
		// Fetch initial thoughts on the first render
		if (isInitialLoad) {
			debouncedFetchMoreThoughts();
			setIsInitialLoad(false);
			return;
		}

		const handleScroll = () => {
			// When the user scrolls to the bottom (minus 200px), load more thoughts
			if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
				if (!isLoading && thoughts.length === 0) {
					return;
				}

				debouncedFetchMoreThoughts(); // Call the debounced version instead
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [debouncedFetchMoreThoughts, isInitialLoad]);

	// Fetch thoughts when the filter changes
	// Watch for changes in the 'filter' state and clear thoughts and pagination on change
	useEffect(() => {
		if (shouldRefetch) {
			setThoughts([]); // Clear existing thoughts
			setPage(0); // Reset pagination
			setReachedEnd(false); // Reset the end of thoughts flag
			setIsInitialLoad(true); // Reset initial load flag
			debouncedFetchMoreThoughts(); // Fetch thoughts with the new filter
			setShouldRefetch(false); // Reset the flag after refetching
		}
	}, [shouldRefetch, debouncedFetchMoreThoughts]);

	useEffect(() => {
		setShouldRefetch(true);
		setLocalStorage('feedThoughtFilter', filter);
	}, [filter]);

	return (
		<div className="flex flex-col items-center max-w-3xl mx-auto mt-28">
			<Reveal width="100%" animation="slide-top" delay={0.05}>
				<NewThoughtForm onSubmit={() => setShouldRefetch(true)} />
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
				{thoughts.map(thought => (
					<Reveal key={thought.id} width="100%" animation="slide-bottom" delay={0.05}>
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
				{reachedEnd && (
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
			</div>
		</div>
	);
};

export default Feed;
