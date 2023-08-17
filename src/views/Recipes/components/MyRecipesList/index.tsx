import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import requests from '../../../../api/requests';
import Button from '../../../../components/Button';
import ErrorOccurred from '../../../../components/ErrorOccurred';
import Loading from '../../../../components/Loading';
import NoItemsFound from '../../../../components/NoItemsFound';
import ReachedEnd from '../../../../components/ReachedEnd';
import Recipe from '../../../../components/Recipe';
import Reveal from '../../../../components/Reveal';
import { RecipesContext } from '../../../../contextProviders/RecipesContext';
import { UserContext } from '../../../../contextProviders/UserContext';

const MyRecipesList: React.FC = () => {
	const recipesContext = useContext(RecipesContext);
	const { loggedUser } = useContext(UserContext);

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [anErrorOccurred, setAnErrorOccurred] = useState<boolean>(false);

	const loadingRef = useRef<boolean>(false);
	const anErrorOccurredRef = useRef<boolean>(false);

	// Function to fetch more recipes and update the state
	const fetchMoreRecipes = useCallback(async () => {
		// PRevent making duplicate requests white loading or if reached the end
		if (
			loadingRef.current ||
			recipesContext.mine.reachedEnd ||
			anErrorOccurredRef.current ||
			!loggedUser
		) {
			return;
		}

		loadingRef.current = true;
		setIsLoading(true);

		try {
			const response = await requests.recipes.getRecipes({
				filter: 'recent',
				page: recipesContext.mine.page,
				limit: 6,
				authorId: loggedUser.id,
			});

			if (response.data.success) {
				const newRecipes = response.data.data?.recipes ?? [];

				// Check if there are duplicate recipes
				const duplicateRecipes = newRecipes.filter(newRecipe =>
					recipesContext.mine.recipes.some(recipe => recipe.id === newRecipe.id),
				);

				// Remove the duplicate recipes from the new recipes
				const filteredNewRecipes = newRecipes.filter(
					newRecipe => !duplicateRecipes.includes(newRecipe),
				);

				const totalRecipes = [...recipesContext.mine.recipes, ...filteredNewRecipes];

				recipesContext.mine.setRecipes(totalRecipes);
				recipesContext.mine.incrementPage();

				// Check if reached the end to disable further loading
				if (response.data.data?.totalCount === totalRecipes.length) {
					recipesContext.mine.setReachedEnd(true);
				}
			} else {
				// if the response was an 404 and there are recipes in the list, then it reached the end
				if (response.status === 404 && recipesContext.mine.recipes.length > 0) {
					recipesContext.mine.setReachedEnd(true);
				} else {
					anErrorOccurredRef.current = true;
					setAnErrorOccurred(true);
				}
			}
		} catch (error) {
			console.log('Error fetching more recipes:', error);
			anErrorOccurredRef.current = true;
			setAnErrorOccurred(true);
		} finally {
			loadingRef.current = false;
			setIsLoading(false);
		}
	}, [loggedUser, recipesContext.mine]);

	useEffect(() => {
		// Fetch initial recipes on mount
		if (recipesContext.mine.isInitialLoad) {
			fetchMoreRecipes();
			recipesContext.mine.setIsInitialLoad(false);
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
	}, [fetchMoreRecipes, recipesContext.mine]);

	return (
		<div className="flex flex-col items-center justify-center">
			{!loggedUser?.isBlocked && (
				<div className="flex w-full">
					<Link to="/recipes/add" className="w-full sm:w-40">
						<Reveal width="100%" animation="slide-left" delay={0.05}>
							<Button
								id="add-recipe"
								type="button"
								className="py-1.5 text-white px-8 bg-zinc-800 text-center w-full flex justify-center"
							>
								Add Recipe
							</Button>
						</Reveal>
					</Link>
				</div>
			)}

			{/* Recipes */}
			<div className="flex flex-wrap justify-start w-full gap-5 my-10">
				{recipesContext.mine.recipes.map((recipe, index) => (
					<Recipe key={recipe.id} index={index} recipe={recipe} />
				))}
			</div>

			{isLoading && <Loading />}
			{recipesContext.mine.reachedEnd && <ReachedEnd />}
			{anErrorOccurred && recipesContext.mine.recipes.length !== 0 && (
				<ErrorOccurred text="An error occurred while fetching recipes." />
			)}
			{!isLoading && recipesContext.mine.recipes.length === 0 && (
				<NoItemsFound
					warning="No recipes found."
					message="Change the filter or add a new thought."
				/>
			)}
		</div>
	);
};

export default MyRecipesList;
