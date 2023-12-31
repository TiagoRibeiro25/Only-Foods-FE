import { IThought } from '../../types/types';

export type ContextType = 'recent' | 'popular' | 'following';

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
	handleNewThought: (thought: IThought) => void;
	deleteThought: (thoughtId: number) => void;
	editThought: (thoughtId: number, newContent: string) => void;
	updateLikes: (thoughtId: number, newLikes: number, isLiked: boolean) => void;
}

export interface ThoughtsProviderProps {
	children: React.ReactNode;
}
