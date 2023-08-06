import { IThought } from '../../types/types';

export interface ThoughtsContextType {
	recent: {
		thoughts: IThought[];
		setThoughts: (thoughts: IThought[]) => void;
		page: number;
		incrementPage: () => void;
		reachedEnd: boolean;
		setReachedEnd: (reachedEnd: boolean) => void;
		isInitialLoad: boolean;
		setIsInitialLoad: (isInitialLoad: boolean) => void;
	};
	popular: {
		thoughts: IThought[];
		setThoughts: (thoughts: IThought[]) => void;
		page: number;
		incrementPage: () => void;
		reachedEnd: boolean;
		setReachedEnd: (reachedEnd: boolean) => void;
		isInitialLoad: boolean;
		setIsInitialLoad: (isInitialLoad: boolean) => void;
	};
	following: {
		thoughts: IThought[];
		setThoughts: (thoughts: IThought[]) => void;
		page: number;
		incrementPage: () => void;
		reachedEnd: boolean;
		setReachedEnd: (reachedEnd: boolean) => void;
		isInitialLoad: boolean;
		setIsInitialLoad: (isInitialLoad: boolean) => void;
	};
	resetAllState: () => void;
}

export interface ThoughtsProviderProps {
	children: React.ReactNode;
}
