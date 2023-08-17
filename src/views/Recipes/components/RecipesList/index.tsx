import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import requests from '../../../../api/requests/index.ts';
import ErrorOccurred from '../../../../components/ErrorOccurred';
import Loading from '../../../../components/Loading';
import NoItemsFound from '../../../../components/NoItemsFound';
import ReachedEnd from '../../../../components/ReachedEnd';
import Recipe from '../../../../components/Recipe';
import Reveal from '../../../../components/Reveal';
import Select from '../../../../components/Select';
import { RecipesContext } from '../../../../contextProviders/RecipesContext.tsx';
import { UserContext } from '../../../../contextProviders/UserContext';
import {
	Filter,
	getFilterFromLS,
	setLocalStorage,
} from '../../../../utils/useLocalStorage';
import { options } from './options';

const RecipesList: React.FC = () => {
	const recipesContext = useContext(RecipesContext);
	const { loggedUser } = useContext(UserContext);

	const [filter, setFilter] = useState<Filter>(
		getFilterFromLS({ key: 'feedRecipeFilter', isUserLogged: !!loggedUser, options }),
	);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [anErrorOccurred, setAnErrorOccurred] = useState<boolean>(false);

	const loadingRef = useRef<boolean>(false);
	const anErrorOccurredRef = useRef<boolean>(false);

	// Function to fetch more recipes and update the state
	const fetchMoreRecipes = useCallback(async () => {
		// Prevent making duplicate requests while loading or if reached the end
		if (
			loadingRef.current ||
			recipesContext[filter].reachedEnd ||
			anErrorOccurredRef.current
		) {
			return;
		}

		loadingRef.current = true;
		setIsLoading(true);

		try {
			const response = await requests.recipes.getRecipes({
				filter,
				page: recipesContext[filter].page,
				limit: 6,
			});

			if (response.data.success) {
				const newRecipes = response.data.data?.recipes ?? [];

				// Check if there are duplicate recipes
				const duplicateRecipes = newRecipes.filter(newRecipe =>
					recipesContext[filter].recipes.some(recipe => recipe.id === newRecipe.id),
				);

				// Remove the duplicate recipes from the new recipes
				const filteredNewRecipes = newRecipes.filter(
					newRecipe => !duplicateRecipes.includes(newRecipe),
				);

				const totalRecipes = [...recipesContext[filter].recipes, ...filteredNewRecipes];

				recipesContext[filter].setRecipes(totalRecipes);
				recipesContext[filter].incrementPage();

				// Check if reached the end of the recipes to disable further loading
				if (response.data.data?.totalCount === totalRecipes.length) {
					recipesContext[filter].setReachedEnd(true);
				}
			} else {
				// if the response was an 404 and there are recipes in the list, then it reached the end
				if (response.status === 404 && recipesContext[filter].recipes.length > 0) {
					recipesContext[filter].setReachedEnd(true);
				} else {
					anErrorOccurredRef.current = true;
					setAnErrorOccurred(true);
				}
			}
		} catch (error) {
			console.log('Error fetching more recipes: ', error);
			anErrorOccurredRef.current = true;
			setAnErrorOccurred(true);
		} finally {
			loadingRef.current = false;
			setIsLoading(false);
		}
	}, [filter, recipesContext]);

	useEffect(() => {
		// Fetch initial recipes on mount
		if (recipesContext[filter].isInitialLoad) {
			fetchMoreRecipes();
			recipesContext[filter].setIsInitialLoad(false);
			return;
		}

		const handleScroll = () => {
			// When the user scrolls to the bottom (minus 200px), load more recipes
			if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
				fetchMoreRecipes();
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [fetchMoreRecipes, filter, recipesContext]);

	useEffect(() => {
		setLocalStorage('feedRecipeFilter', filter);
		anErrorOccurredRef.current = false;
		setAnErrorOccurred(false);
	}, [filter]);

	return (
		<div className="flex flex-col items-center justify-center">
			{/* Filter Recipes */}
			<Reveal width="100%" animation="slide-right" delay={0.05}>
				<div className="flex justify-end w-full">
					<Select
						className="w-full sm:w-40"
						id="filter-recipes"
						labelText="Filter Recipes"
						options={loggedUser ? options : options.slice(0, 2)}
						value={filter}
						onChange={e => setFilter(e.target.value as Filter)}
					/>
				</div>
			</Reveal>

			{/* Recipes */}
			<div className="flex flex-wrap justify-start w-full gap-5 my-10">
				{recipesContext[filter].recipes.map((recipe, index) => (
					<Recipe key={recipe.id} index={index} recipe={recipe} />
				))}
			</div>

			{isLoading && <Loading />}
			{recipesContext[filter].reachedEnd && <ReachedEnd />}
			{anErrorOccurred && recipesContext[filter].recipes.length !== 0 && (
				<ErrorOccurred text="An error occurred while fetching recipes." />
			)}
			{!isLoading && recipesContext[filter].recipes.length === 0 && (
				<NoItemsFound
					warning="No recipes found."
					message="Change the filter or add a new thought."
				/>
			)}
		</div>
	);
};

export default RecipesList;
