import { createContext, useMemo, useState } from 'react';
import { IThought } from '../types/types';
import { ThoughtsContextType, ThoughtsProviderProps } from './types/ThoughtsContext';

const warnSetThoughts = (): void => {
	// eslint-disable-next-line no-console
};

const ThoughtsContext = createContext<ThoughtsContextType>({
	recent: {
		thoughts: [],
		setThoughts: warnSetThoughts,
		page: 1,
		incrementPage: warnSetThoughts,
		reachedEnd: false,
		setReachedEnd: (reachedEnd: boolean) => reachedEnd,
		isInitialLoad: true,
		setIsInitialLoad: (isInitialLoad: boolean) => isInitialLoad,
	},
	popular: {
		thoughts: [],
		setThoughts: warnSetThoughts,
		page: 1,
		incrementPage: warnSetThoughts,
		reachedEnd: false,
		setReachedEnd: (reachedEnd: boolean) => reachedEnd,
		isInitialLoad: true,
		setIsInitialLoad: (isInitialLoad: boolean) => isInitialLoad,
	},
	following: {
		thoughts: [],
		setThoughts: warnSetThoughts,
		page: 1,
		incrementPage: warnSetThoughts,
		reachedEnd: false,
		setReachedEnd: (reachedEnd: boolean) => reachedEnd,
		isInitialLoad: true,
		setIsInitialLoad: (isInitialLoad: boolean) => isInitialLoad,
	},

	resetAllState: () => {},
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

	const contextValue = useMemo(
		() => ({
			recent: recentContextValue,
			popular: popularContextValue,
			following: followingContextValue,
			resetAllState,
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
