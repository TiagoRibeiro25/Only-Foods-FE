import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PostUserActions from '../../../../../../components/PostUserActions';
import { RecipesContext } from '../../../../../../contextProviders/RecipesContext';
import { IRecipe } from '../../../../../../types/types';

interface RecipeResultProps {
	recipe: IRecipe;
}

const RecipeResult: React.FC<RecipeResultProps> = ({ recipe }) => {
	const recipesContext = useContext(RecipesContext);

	return (
		<div className="flex flex-col w-full rounded-lg sm:flex-row bg-zinc-100 sm:h-36">
			<div className="flex-shrink-0 h-56 sm:h-full sm:w-52">
				<Link
					to={'/recipe/' + recipe.id}
					className="transition-opacity duration-300 hover:opacity-80"
				>
					<img
						className="object-cover object-center w-full h-full rounded-t-lg sm:rounded-l-lg"
						src={recipe.recipeImages[0].cloudinaryImage}
						alt="recipe"
						loading="lazy"
					/>
				</Link>
			</div>

			<div className="flex flex-col flex-grow p-3">
				<h2 className="text-2xl truncate font-bellefair">
					<Link to={'/recipe/' + recipe.id} className="hover:underline">
						{recipe.title}
					</Link>
				</h2>
				<div className="h-[60px] overflow-hidden">
					<p className="text-sm leading-5 text-justify text-gray-600">
						{recipe.description?.trim() ?? 'No description provided'}
					</p>
				</div>
				<div className="flex flex-row items-end flex-grow mt-2 sm:mt-0">
					<div className="scale-90">
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
					</div>
					<div className="flex justify-end flex-grow">
						<span className="text-sm text-gray-600">
							Author:{' '}
							<Link to={'/user/' + recipe.author.id} className="hover:underline">
								<span className="truncate">
									{recipe.author.blocked ? '(User blocked)' : recipe.author.username}
								</span>
							</Link>
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RecipeResult;
