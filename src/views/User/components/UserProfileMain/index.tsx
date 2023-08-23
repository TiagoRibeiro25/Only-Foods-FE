import classNames from 'classnames';
import { useCallback, useContext, useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';
import { Link } from 'react-router-dom';
import requests from '../../../../api/requests';
import Button from '../../../../components/Button';
import ErrorOccurred from '../../../../components/ErrorOccurred';
import LoadingRecipes from '../../../../components/LoadingRecipes';
import Recipe from '../../../../components/Recipe';
import Reveal from '../../../../components/Reveal';
import { UserContext } from '../../../../contextProviders/UserContext';
import { IRecipe } from '../../../../types/types';

interface UserProfileMainProps {
	userId: number;
}

const UserProfileMain: React.FC<UserProfileMainProps> = ({ userId }) => {
	const { loggedUser } = useContext(UserContext);

	const [recipes, setRecipes] = useState<IRecipe[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [errorOccurred, setErrorOccurred] = useState<boolean>(false);

	const fetchRecipes = useCallback(async (): Promise<void> => {
		setIsLoading(true);

		try {
			const response = await requests.recipes.getRecipes({
				filter: 'popular',
				authorId: userId,
				limit: 6,
			});

			if (response.data.success && response.data.data?.recipes) {
				setRecipes(response.data.data?.recipes);
			}
		} catch (error) {
			console.log('An error occurred while fetching the recipes: ', error);
			setErrorOccurred(true);
		} finally {
			setIsLoading(false);
		}
	}, [userId]);

	useEffect(() => {
		fetchRecipes();
	}, [fetchRecipes]);

	return (
		<main className="mt-6 mb-20">
			<Reveal width="100%" animation="slide-right">
				<section id="most-popular-recipes">
					<h2
						className={classNames('text-2xl font-bold text-gray-800 font-bellefair', {
							'text-center sm:text-start': !isLoading && recipes.length === 0,
						})}
					>
						Most Popular Recipes
					</h2>

					{isLoading && (
						<div className="flex items-center mt-6">
							<Marquee speed={60} pauseOnHover>
								<div className="flex flex-row">
									{Array.from({ length: 3 }).map(() => (
										<div key={crypto.randomUUID()} className="max-w-xs lg:mr-4">
											<LoadingRecipes className="w-72" />
										</div>
									))}
								</div>
							</Marquee>
						</div>
					)}
					{!isLoading && errorOccurred && (
						<div className="my-6">
							<ErrorOccurred text="An error occurred while trying to get the recipes." />
						</div>
					)}
					{!isLoading && recipes.length === 0 && (
						<div className="flex flex-col items-center justify-center w-full h-24 my-6">
							<p className="text-lg text-gray-500">No recipes found.</p>
							{loggedUser?.id === userId && (
								<Link to="/recipes/add">
									<Button
										type="button"
										className="text-white bg-zinc-800 py-1.5 px-4 mt-2"
									>
										Create your first recipe
									</Button>
								</Link>
							)}
						</div>
					)}
					{!isLoading && recipes.length > 0 && (
						<div className="flex w-full rounded">
							<Marquee className="block w-full h-full" speed={60} pauseOnHover>
								{recipes.length >= 3 &&
									recipes.map((recipe, index) => (
										<div key={recipe.id} className="max-w-xs scale-90 lg:mr-10">
											<Recipe index={index} recipe={recipe} animation="none" />
										</div>
									))}

								{recipes.length === 1 &&
									Array.from({ length: 3 }).map(() => (
										<div key={crypto.randomUUID()} className="max-w-xs scale-90 lg:mr-10">
											<Recipe recipe={recipes[0]} animation="none" />
										</div>
									))}

								{recipes.length === 2 &&
									Array.from({ length: 3 }).map((_, index) => (
										<div key={crypto.randomUUID()} className="max-w-xs scale-90 lg:mr-10">
											<Recipe
												recipe={index % 2 === 0 ? recipes[0] : recipes[1]}
												animation="none"
											/>
										</div>
									))}
							</Marquee>
						</div>
					)}
				</section>
			</Reveal>
		</main>
	);
};

export default UserProfileMain;
