import { createContext, useMemo, useState } from 'react';
import { IRecipe } from '../types/types';
import { RecipesContextType, RecipesProviderProps } from './types/RecipesContext';

const warnSetRecipes = (): void => {
	// Empty function
};

const initialContextRecipesValue = {
	recipes: [],
	setRecipes: warnSetRecipes,
	page: 1,
	incrementPage: warnSetRecipes,
	reachedEnd: false,
	setReachedEnd: (reachedEnd: boolean) => reachedEnd,
	isInitialLoad: true,
	setIsInitialLoad: (isInitialLoad: boolean) => isInitialLoad,
};

const RecipesContext = createContext<RecipesContextType>({
	recent: initialContextRecipesValue,
	popular: initialContextRecipesValue,
	following: initialContextRecipesValue,
	mine: initialContextRecipesValue,

	resetAllState: () => {},
	handleNewRecipe: () => {},
	deleteRecipe: () => {},
	updateLikes: () => {},
});

const RecipesProvider = (props: RecipesProviderProps) => {
	const [recentRecipes, setRecentRecipes] = useState<IRecipe[]>([]);
	const [recentPage, setRecentPage] = useState<number>(1);
	const [recentReachedEnd, setRecentReachedEnd] = useState<boolean>(false);
	const [recentIsInitialLoad, setRecentIsInitialLoad] = useState<boolean>(true);

	const [popularRecipes, setPopularRecipes] = useState<IRecipe[]>([]);
	const [popularPage, setPopularPage] = useState<number>(1);
	const [popularReachedEnd, setPopularReachedEnd] = useState<boolean>(false);
	const [popularIsInitialLoad, setPopularIsInitialLoad] = useState<boolean>(true);

	const [followingRecipes, setFollowingRecipes] = useState<IRecipe[]>([]);
	const [followingPage, setFollowingPage] = useState<number>(1);
	const [followingReachedEnd, setFollowingReachedEnd] = useState<boolean>(false);
	const [followingIsInitialLoad, setFollowingIsInitialLoad] = useState<boolean>(true);

	const [mineRecipes, setMineRecipes] = useState<IRecipe[]>([]);
	const [minePage, setMinePage] = useState<number>(1);
	const [mineReachedEnd, setMineReachedEnd] = useState<boolean>(false);
	const [mineIsInitialLoad, setMineIsInitialLoad] = useState<boolean>(true);

	const recentContextValue = useMemo(
		() => ({
			recipes: recentRecipes,
			setRecipes: setRecentRecipes,
			page: recentPage,
			incrementPage: () => setRecentPage(recentPage + 1),
			reachedEnd: recentReachedEnd,
			setReachedEnd: setRecentReachedEnd,
			isInitialLoad: recentIsInitialLoad,
			setIsInitialLoad: setRecentIsInitialLoad,
		}),
		[recentRecipes, recentPage, recentReachedEnd, recentIsInitialLoad],
	);

	const popularContextValue = useMemo(
		() => ({
			recipes: popularRecipes,
			setRecipes: setPopularRecipes,
			page: popularPage,
			incrementPage: () => setPopularPage(popularPage + 1),
			reachedEnd: popularReachedEnd,
			setReachedEnd: setPopularReachedEnd,
			isInitialLoad: popularIsInitialLoad,
			setIsInitialLoad: setPopularIsInitialLoad,
		}),
		[popularRecipes, popularPage, popularReachedEnd, popularIsInitialLoad],
	);

	const followingContextValue = useMemo(
		() => ({
			recipes: followingRecipes,
			setRecipes: setFollowingRecipes,
			page: followingPage,
			incrementPage: () => setFollowingPage(followingPage + 1),
			reachedEnd: followingReachedEnd,
			setReachedEnd: setFollowingReachedEnd,
			isInitialLoad: followingIsInitialLoad,
			setIsInitialLoad: setFollowingIsInitialLoad,
		}),
		[followingRecipes, followingPage, followingReachedEnd, followingIsInitialLoad],
	);

	const mineContextValue = useMemo(
		() => ({
			recipes: mineRecipes,
			setRecipes: setMineRecipes,
			page: minePage,
			incrementPage: () => setMinePage(minePage + 1),
			reachedEnd: mineReachedEnd,
			setReachedEnd: setMineReachedEnd,
			isInitialLoad: mineIsInitialLoad,
			setIsInitialLoad: setMineIsInitialLoad,
		}),
		[mineRecipes, minePage, mineReachedEnd, mineIsInitialLoad],
	);

	const resetAllState = () => {
		setRecentRecipes([]);
		setRecentPage(1);
		setRecentReachedEnd(false);
		setRecentIsInitialLoad(true);

		setPopularRecipes([]);
		setPopularPage(1);
		setPopularReachedEnd(false);
		setPopularIsInitialLoad(true);

		setFollowingRecipes([]);
		setFollowingPage(1);
		setFollowingReachedEnd(false);
		setFollowingIsInitialLoad(true);

		setMineRecipes([]);
		setMinePage(1);
		setMineReachedEnd(false);
		setMineIsInitialLoad(true);
	};

	const handleNewRecipe = (recipe: IRecipe) => {
		setRecentRecipes([recipe, ...recentRecipes]);
		setMineRecipes([recipe, ...mineRecipes]);
	};

	const deleteRecipe = (recipeId: number) => {
		setRecentRecipes(recentRecipes.filter(recipe => recipe.id !== recipeId));
		setPopularRecipes(popularRecipes.filter(recipe => recipe.id !== recipeId));
		setMineRecipes(mineRecipes.filter(recipe => recipe.id !== recipeId));
	};

	const updateLikes = (recipeId: number, newLikes: number, isLiked: boolean) => {
		const updateRecipeLikes = (recipes: IRecipe[]) => {
			return recipes.map(recipe => {
				if (recipe.id === recipeId) {
					return {
						...recipe,
						likes: newLikes,
						isLiked,
					};
				}
				return recipe;
			});
		};

		setRecentRecipes(updateRecipeLikes(recentRecipes));
		setPopularRecipes(updateRecipeLikes(popularRecipes));
		setFollowingRecipes(updateRecipeLikes(followingRecipes));
		setMineRecipes(updateRecipeLikes(mineRecipes));
	};

	const contextValue = useMemo(
		() => ({
			recent: recentContextValue,
			popular: popularContextValue,
			following: followingContextValue,
			mine: mineContextValue,
			resetAllState,
			handleNewRecipe,
			deleteRecipe,
			updateLikes,
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[recentContextValue, popularContextValue, followingContextValue, mineContextValue],
	);

	return (
		<RecipesContext.Provider value={contextValue}>
			{props.children}
		</RecipesContext.Provider>
	);
};

export { RecipesContext, RecipesProvider };
