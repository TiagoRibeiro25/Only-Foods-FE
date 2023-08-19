import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { RecipesContext } from '../../contextProviders/RecipesContext';
import { IRecipe } from '../../types/types';
import Button from '../Button';
import PostUserActions from '../PostUserActions';
import Reveal from '../Reveal';

interface RecipeProps {
	recipe: IRecipe;
	index?: number;
}

function getRevealAnimation(index: number | undefined) {
	if (index === undefined) return 'slide-bottom';
	return index % 2 === 0 ? 'slide-left' : 'slide-right';
}

const Recipe: React.FC<RecipeProps> = ({ recipe, index }) => {
	const recipesContext = useContext(RecipesContext);

	return (
		<div className="rounded lg:w-[374px] w-full mb-6 lg:mb-0">
			<Reveal animation={getRevealAnimation(index)} width="100%" delay={0.15}>
				<div className="w-full h-full bg-zinc-100">
					<img
						className="w-full rounded-t lg:h-[200px] sm:h-[300px] h-[200px] object-cover object-center"
						src={recipe.recipeImages[0].cloudinaryImage}
						loading="lazy"
						alt="Recipe Image"
					/>

					<div className="p-2 h-[145px] overflow-hidden">
						<h2 className="text-2xl font-bold leading-7 tracking-tight text-gray-900 font-bellefair">
							{recipe.title.trim()}
						</h2>
						<p className="my-2 font-normal leading-5 text-gray-700">
							{recipe.description?.trim() ?? 'No description provided'}
						</p>
					</div>

					<div className="flex flex-row py-3 mx-3">
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

						<div className="flex justify-end flex-grow">
							<Link to={'/recipe/' + recipe.id}>
								<Button
									type="button"
									id={'view-recipe-' + recipe.id}
									className="px-3 py-1 text-white bg-zinc-800"
								>
									View Recipe
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</Reveal>
		</div>
	);
};

export default Recipe;
