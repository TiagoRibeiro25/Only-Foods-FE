import { createContext, useMemo, useState } from 'react';
import { IThought } from '../types/types';
import { ThoughtsContextType, ThoughtsProviderProps } from './types/ThoughtsContext';

const warnSetThoughts = (): void => {
	// eslint-disable-next-line no-console
};

const initialContextThoughtsValue = {
	thoughts: [],
	setThoughts: warnSetThoughts,
	page: 1,
	incrementPage: warnSetThoughts,
	reachedEnd: false,
	setReachedEnd: (reachedEnd: boolean) => reachedEnd,
	isInitialLoad: true,
	setIsInitialLoad: (isInitialLoad: boolean) => isInitialLoad,
};

const ThoughtsContext = createContext<ThoughtsContextType>({
	recent: initialContextThoughtsValue,
	popular: initialContextThoughtsValue,
	following: initialContextThoughtsValue,

	resetAllState: () => {},
	handleNewThought: () => {},
	deleteThought: () => {},
	editThought: () => {},
	updateLikes: () => {},
});

const ThoughtsProvider = (props: ThoughtsProviderProps) => {
	const [recentThoughts, setRecentThoughts] = useState<IThought[]>([]);
	const [recentPage, setRecentPage] = useState<number>(1);
	const [recentReachedEnd, setRecentReachedEnd] = useState<boolean>(false);
	const [recentIsInitialLoad, setRecentIsInitialLoad] = useState<boolean>(true);

	const [popularThoughts, setPopularThoughts] = useState<IThought[]>([]);
	const [popularPage, setPopularPage] = useState<number>(1);
	const [popularReachedEnd, setPopularReachedEnd] = useState<boolean>(false);
	const [popularIsInitialLoad, setPopularIsInitialLoad] = useState<boolean>(true);

	const [followingThoughts, setFollowingThoughts] = useState<IThought[]>([]);
	const [followingPage, setFollowingPage] = useState<number>(1);
	const [followingReachedEnd, setFollowingReachedEnd] = useState<boolean>(false);
	const [followingIsInitialLoad, setFollowingIsInitialLoad] = useState<boolean>(true);

	const recentContextValue = useMemo(
		() => ({
			thoughts: recentThoughts,
			setThoughts: setRecentThoughts,
			page: recentPage,
			incrementPage: () => setRecentPage(recentPage + 1),
			reachedEnd: recentReachedEnd,
			setReachedEnd: setRecentReachedEnd,
			isInitialLoad: recentIsInitialLoad,
			setIsInitialLoad: setRecentIsInitialLoad,
		}),
		[
			recentThoughts,
			setRecentThoughts,
			recentPage,
			setRecentPage,
			recentReachedEnd,
			setRecentReachedEnd,
			recentIsInitialLoad,
			setRecentIsInitialLoad,
		],
	);

	const popularContextValue = useMemo(
		() => ({
			thoughts: popularThoughts,
			setThoughts: setPopularThoughts,
			page: popularPage,
			incrementPage: () => setPopularPage(popularPage + 1),
			reachedEnd: popularReachedEnd,
			setReachedEnd: setPopularReachedEnd,
			isInitialLoad: popularIsInitialLoad,
			setIsInitialLoad: setPopularIsInitialLoad,
		}),

		[
			popularThoughts,
			setPopularThoughts,
			popularPage,
			setPopularPage,
			popularReachedEnd,
			setPopularReachedEnd,
			popularIsInitialLoad,
			setPopularIsInitialLoad,
		],
	);

	const followingContextValue = useMemo(
		() => ({
			thoughts: followingThoughts,
			setThoughts: setFollowingThoughts,
			page: followingPage,
			incrementPage: () => setFollowingPage(followingPage + 1),
			reachedEnd: followingReachedEnd,
			setReachedEnd: setFollowingReachedEnd,
			isInitialLoad: followingIsInitialLoad,
			setIsInitialLoad: setFollowingIsInitialLoad,
		}),

		[
			followingThoughts,
			setFollowingThoughts,
			followingPage,
			setFollowingPage,
			followingReachedEnd,
			setFollowingReachedEnd,
			followingIsInitialLoad,
			setFollowingIsInitialLoad,
		],
	);

	const resetAllState = () => {
		// Reset all recent state variables
		setRecentThoughts([]);
		setRecentPage(1);
		setRecentReachedEnd(false);
		setRecentIsInitialLoad(true);

		// Reset all popular state variables
		setPopularThoughts([]);
		setPopularPage(1);
		setPopularReachedEnd(false);
		setPopularIsInitialLoad(true);

		// Reset all following state variables
		setFollowingThoughts([]);
		setFollowingPage(1);
		setFollowingReachedEnd(false);
		setFollowingIsInitialLoad(true);
	};

	const handleNewThought = (newThought: IThought) => {
		// Add new thought to recent thoughts
		setRecentThoughts(prevRecentThoughts => [newThought, ...prevRecentThoughts]);
	};

	const deleteThought = (thoughtId: number) => {
		// Delete thought from recent thoughts
		setRecentThoughts(prevRecentThoughts =>
			prevRecentThoughts.filter(thought => thought.id !== thoughtId),
		);

		// Delete thought from popular thoughts
		setPopularThoughts(prevPopularThoughts =>
			prevPopularThoughts.filter(thought => thought.id !== thoughtId),
		);

		// Delete thought from following thoughts
		setFollowingThoughts(prevFollowingThoughts =>
			prevFollowingThoughts.filter(thought => thought.id !== thoughtId),
		);
	};

	const editThought = (thoughtId: number, newContent: string) => {
		// Edit thought from recent thoughts
		setRecentThoughts(prevRecentThoughts =>
			prevRecentThoughts.map(thought =>
				thought.id === thoughtId
					? { ...thought, content: newContent, edited: true }
					: thought,
			),
		);

		// Edit thought from popular thoughts
		setPopularThoughts(prevPopularThoughts =>
			prevPopularThoughts.map(thought =>
				thought.id === thoughtId
					? { ...thought, content: newContent, edited: true }
					: thought,
			),
		);

		// Edit thought from following thoughts
		setFollowingThoughts(prevFollowingThoughts =>
			prevFollowingThoughts.map(thought =>
				thought.id === thoughtId
					? { ...thought, content: newContent, edited: true }
					: thought,
			),
		);
	};

	const updateLikes = (thoughtId: number, newLikes: number, isLiked: boolean) => {
		// Update thought from recent thoughts
		setRecentThoughts(prevRecentThoughts =>
			prevRecentThoughts.map(thought =>
				thought.id === thoughtId ? { ...thought, likes: newLikes, isLiked } : thought,
			),
		);

		// Update thought from popular thoughts
		setPopularThoughts(prevPopularThoughts =>
			prevPopularThoughts.map(thought =>
				thought.id === thoughtId ? { ...thought, likes: newLikes, isLiked } : thought,
			),
		);

		// Update thought from following thoughts
		setFollowingThoughts(prevFollowingThoughts =>
			prevFollowingThoughts.map(thought =>
				thought.id === thoughtId ? { ...thought, likes: newLikes, isLiked } : thought,
			),
		);
	};

	const contextValue = useMemo(
		() => ({
			recent: recentContextValue,
			popular: popularContextValue,
			following: followingContextValue,
			resetAllState,
			handleNewThought,
			deleteThought,
			editThought,
			updateLikes,
		}),
		[recentContextValue, popularContextValue, followingContextValue],
	);

	return (
		<ThoughtsContext.Provider value={contextValue}>
			{props.children}
		</ThoughtsContext.Provider>
	);
};

export { ThoughtsContext, ThoughtsProvider };
