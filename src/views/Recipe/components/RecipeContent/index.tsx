import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Recipe } from '../../../../api/requests/recipes/getRecipe';
import Carousel from '../../../../components/Carousel';
import PostUserActions from '../../../../components/PostUserActions';
import { RecipesContext } from '../../../../contextProviders/RecipesContext';
import formatData from '../../../../utils/formatData';
import DeleteRecipeButton from '../DeleteRecipeButton';

interface RecipeContentProps {
	recipe: Recipe;
}

const RecipeContent: React.FC<RecipeContentProps> = ({ recipe }) => {
	const recipesContext = useContext(RecipesContext);

	return (
		<header>
			<Carousel
				images={recipe.recipeImages.map(imageItem => {
					return { id: imageItem.id, src: imageItem.cloudinaryImage };
				})}
			/>

			<div className="mt-6">
				<h1 className="text-3xl font-bellefair">{recipe.title}</h1>
				<p className="text-gray-500 text-md">
					{recipe.description ?? 'This recipe has no description.'}
				</p>

				<div className="flex flex-col mt-4 sm:flex-row">
					<div className="flex flex-row items-center">
						<span className="mr-2">
							Author:{' '}
							<Link to={`/user/${recipe.author.id}`} className="underline">
								{recipe.author.username}
							</Link>
						</span>
						|
						<span className="ml-2">Published {formatData.timeAgo(recipe.createdAt)}</span>
					</div>

					<div className="flex flex-row items-center mt-4 sm:ml-auto sm:mt-0">
						<PostUserActions
							type="recipe"
							id={recipe.id}
							likes={recipe.likes}
							comments={recipe.comments}
							isLiked={recipe.isLiked}
							onLikeUpdate={(id, newLikes, isLiked) => {
								recipe.isLiked = isLiked;
								recipe.likes = newLikes;
								recipesContext.updateLikes(id, newLikes, isLiked);
							}}
						/>

						<DeleteRecipeButton recipe={recipe} />
					</div>
				</div>
			</div>
		</header>
	);
};

export default RecipeContent;
