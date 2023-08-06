import { IThought } from '../../types/types';

interface ThoughtsState {
	thoughts: IThought[];
	setThoughts: (thoughts: IThought[]) => void;
	page: number;
	incrementPage: () => void;
	reachedEnd: boolean;
	setReachedEnd: (reachedEnd: boolean) => void;
	isInitialLoad: boolean;
	setIsInitialLoad: (isInitialLoad: boolean) => void;
}

export interface ThoughtsContextType {
	recent: ThoughtsState;
	popular: ThoughtsState;
	following: ThoughtsState;
	resetAllState: () => void;
}

export interface ThoughtsProviderProps {
	children: React.ReactNode;
}
