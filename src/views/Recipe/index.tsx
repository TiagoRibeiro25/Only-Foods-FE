import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import requests from '../../api/requests';
import { Recipe as RecipeType } from '../../api/requests/recipes/getRecipe';
import ErrorOccurred from '../../components/ErrorOccurred';
import Loading from '../../components/Loading';
import RecipeContent from './components/RecipeContent';

const Recipe: React.FC = () => {
	const { id } = useParams(); // Thought id
	const navigate = useNavigate();

	const [recipe, setRecipe] = useState<RecipeType>();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [errorOccurred, setErrorOccurred] = useState<boolean>(false);

	const fetchRecipe = useCallback(async () => {
		try {
			const response = await requests.recipes.getRecipe(id ? +id : 0);

			if (response.data.success && response.data.data) {
				const recipeData = {
					...response.data.data,
					isLiked: response.data.data?.isLiked ?? false,
					isAuthor: response.data.data?.isAuthor ?? false,
				};

				setRecipe(recipeData);
			} else {
				// If the recipe doesn't exist, redirect to 404 page
				navigate('/404');
			}
		} catch (error) {
			console.log(error);
			setErrorOccurred(true);
		} finally {
			setIsLoading(false);
		}
	}, [id, navigate]);

	useEffect(() => {
		setIsLoading(true);
		fetchRecipe();
	}, [fetchRecipe]);

	return (
		<div className="flex flex-col items-center max-w-3xl mx-auto mt-28">
			<div className="w-full mt-14">
				{isLoading && <Loading />}
				{recipe && !isLoading && <RecipeContent recipe={recipe} />}
				{errorOccurred && (
					<ErrorOccurred
						text={
							'A problem occurred while trying to load this recipe. Please try again later.'
						}
					/>
				)}
			</div>
		</div>
	);
};

export default Recipe;