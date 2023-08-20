import { Carousel } from 'flowbite-react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Recipe } from '../../../../api/requests/recipes/getRecipe';
import HTMLText from '../../../../components/HTMLText';
import PostUserActions from '../../../../components/PostUserActions';
import Reveal from '../../../../components/Reveal';
import { RecipesContext } from '../../../../contextProviders/RecipesContext';
import formatData from '../../../../utils/formatData';
import DeleteRecipeButton from '../DeleteRecipeButton';

interface RecipeContentProps {
	recipe: Recipe;
}

const RecipeContent: React.FC<RecipeContentProps> = ({ recipe }) => {
	const recipesContext = useContext(RecipesContext);

	return (
		<>
			<header>
				<Reveal width="100%" delay={0.05} animation="slide-top">
					<Carousel
						className="w-full h-64 sm:h-96"
						leftControl={recipe.recipeImages.length > 1 ? '' : ' '}
						rightControl={recipe.recipeImages.length > 1 ? '' : ' '}
					>
						{recipe.recipeImages.map(image => {
							return (
								<img
									key={image.id}
									src={image.cloudinaryImage}
									alt={recipe.title}
									className="object-cover w-full h-full hover:cursor-default"
									loading="lazy"
								/>
							);
						})}
					</Carousel>
				</Reveal>

				<div className="mt-6">
					<Reveal width="100%" animation="slide-right">
						<h1 className="text-3xl font-bellefair">{recipe.title}</h1>
					</Reveal>

					<Reveal width="100%" animation="slide-bottom">
						<p className="mt-2 text-justify text-gray-500 text-md">
							{recipe.description ?? 'This recipe has no description.'}
						</p>

						<div className="flex flex-col mt-4 sm:flex-row">
							<div className="flex flex-col sm:items-center sm:flex-row">
								<span className="mr-2">
									Author:{' '}
									<Link to={`/user/${recipe.author.id}`} className="underline">
										{recipe.author.username}
									</Link>
								</span>
								<span className="hidden sm:block">|</span>
								<span className="mt-1.5 sm:ml-2 sm:mt-0">
									Published {formatData.timeAgo(recipe.createdAt)}
								</span>
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
					</Reveal>
				</div>
			</header>

			<main className="mt-8 mb-16">
				<section id="ingredients" className="mt-12">
					<Reveal width="100%" animation="slide-right">
						<h2 className="text-3xl font-bellefair">Ingredients</h2>
					</Reveal>

					<ul className="mt-3 space-y-3 text-gray-500 list-disc list-inside">
						{recipe.ingredients.map(ingredient => (
							<Reveal
								key={crypto.randomUUID()}
								width="100%"
								animation="slide-right"
								duration={0.4}
							>
								<div className="flex flex-row">
									<span className="mr-2">•</span>
									<span>{ingredient}</span>
								</div>
							</Reveal>
						))}
					</ul>
				</section>

				<section id="instructions" className="mt-12">
					<Reveal width="100%" animation="slide-right">
						<h2 className="text-3xl font-bellefair">Instructions</h2>
					</Reveal>

					<ol className="mt-3 space-y-4 text-gray-500 list-disc list-inside">
						{recipe.instructions.map((instruction, index) => (
							<Reveal key={crypto.randomUUID()} width="100%" animation="slide-right">
								<div className="flex flex-row">
									<span className="mr-1 text-black font-bellefair">{index + 1}.</span>
									<span className="text-justify">{instruction}</span>
								</div>
							</Reveal>
						))}
					</ol>
				</section>

				<section id="notes" className="mt-12">
					<Reveal width="100%" animation="slide-right">
						<h2 className="text-3xl font-bellefair">Notes</h2>
					</Reveal>

					<div className="mt-3">
						<Reveal width="100%" animation="slide-bottom" delay={0.5}>
							<HTMLText text={recipe.notes} className="text-gray-500" />
						</Reveal>
					</div>
				</section>
			</main>
		</>
	);
};

export default RecipeContent;
