import { IRecipe } from '../../types/types';

export type ContextType = 'recent' | 'popular' | 'following' | 'mine';

interface RecipesState {
	recipes: IRecipe[];
	setRecipes: (recipes: IRecipe[]) => void;
	page: number;
	incrementPage: () => void;
	reachedEnd: boolean;
	setReachedEnd: (reachedEnd: boolean) => void;
	isInitialLoad: boolean;
	setIsInitialLoad: (isInitialLoad: boolean) => void;
}

export interface RecipesContextType {
	recent: RecipesState;
	popular: RecipesState;
	following: RecipesState;
	mine: RecipesState;
	resetAllState: () => void;
	handleNewRecipe: (recipe: IRecipe) => void;
	deleteRecipe: (recipeId: number) => void;
	updateLikes: (recipeId: number, newLikes: number, isLiked: boolean) => void;
}

export interface RecipesProviderProps {
	children: React.ReactNode;
}
