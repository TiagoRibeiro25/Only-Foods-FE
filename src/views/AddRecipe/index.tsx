import classNames from 'classnames';
import { useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import requests from '../../api/requests';
import LoadingIcon from '../../assets/icons/loading.svg';
import AddImages from '../../components/AddImages';
import Button from '../../components/Button';
import DynamicList, { Item } from '../../components/DynamicList';
import Input from '../../components/Input';
import Reveal from '../../components/Reveal';
import Textarea from '../../components/Textarea';
import { RecipesContext } from '../../contextProviders/RecipesContext';
import { UserContext } from '../../contextProviders/UserContext';
import { Base64Img } from '../../types/types';

const AddRecipe: React.FC = () => {
	const navigate = useNavigate();

	const recipesContext = useContext(RecipesContext);
	const { loggedUser } = useContext(UserContext);

	const [images, setImages] = useState<Base64Img[]>([]);
	const [title, setTitle] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [ingredients, setIngredients] = useState<Item[]>([{ id: '1', value: '' }]);
	const [instructions, setInstructions] = useState<Item[]>([{ id: '1', value: '' }]);
	const [notes, setNotes] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [statusMSg, setStatusMSg] = useState<string>('');

	const isButtonDisabled = useMemo(() => {
		if (images.length === 0) return true;
		if (title.trim() === '') return true;
		if (ingredients.length === 1) return true;
		if (instructions.length === 1) return true;
		if (loading) return true;
	}, [images.length, ingredients.length, instructions.length, loading, title]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();

		setLoading(true);
		setStatusMSg('');

		try {
			const response = await requests.recipes.addRecipe({
				title,
				description,
				ingredients: ingredients.map(ingredient => ingredient.value).slice(0, -1),
				instructions: instructions.map(instruction => instruction.value).slice(0, -1),
				notes,
				recipeImages: images,
			});

			if (response.data.success && response.data.data && loggedUser) {
				setStatusMSg('Recipe successfully created!');

				recipesContext.handleNewRecipe({
					id: response.data.data.recipe.id,
					title: response.data.data.recipe.title,
					description: response.data.data.recipe.description,
					author: {
						id: loggedUser.id,
						blocked: false,
						username: loggedUser.username,
					},
					recipeImages: response.data.data.images.map(image => {
						return {
							id: image.id,
							cloudinaryImage: image.cloudinaryImage,
						};
					}),
					likes: 0,
					comments: 0,
					isAuthor: true,
					isLiked: false,
					createdAt: response.data.data.recipe.createdAt,
				});

				navigate(`/recipe/${response.data.data.recipe.id}`);
			} else {
				setStatusMSg(response.data.message);
			}
		} catch (error) {
			console.log('An error occurred while creating the recipe: ', error);
			setStatusMSg(
				'An error occurred while creating the recipe. Please try again later.',
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center max-w-3xl mx-auto">
			<Reveal width="100%" animation="slide-right" delay={0.05}>
				<h1 className="w-full mt-3 text-3xl font-bellefair">Create a New Recipe</h1>
			</Reveal>

			<form className="w-full my-10" onSubmit={handleSubmit}>
				{/* Images */}
				<Reveal width="100%" animation="slide-right" delay={0.2}>
					<h2 className="mb-3 text-2xl font-bellefair">Images</h2>
				</Reveal>
				<Reveal width="100%" delay={0.05} animation="slide-top">
					<AddImages images={images} setImages={setImages} />
				</Reveal>

				{/* Title */}
				<Reveal width="100%" animation="slide-right" delay={0.2}>
					<Input
						className="mt-12"
						type="text"
						id="title"
						name="title"
						value={title}
						onChange={e => setTitle(e)}
						placeholder="Recipe Title"
						autoComplete="New Recipe Title"
						required
					/>
				</Reveal>

				{/* Description */}
				<Reveal width="100%" animation="slide-right" delay={0.2}>
					<h2 className="mt-12 mb-3 text-2xl font-bellefair">Description</h2>
				</Reveal>
				<Reveal width="100%" animation="slide-bottom" delay={0.2}>
					<Textarea
						className="p-3 text-sm border-2 border-gray-500 rounded-md focus:border-gray-500"
						name="description"
						id="description"
						placeholder="Enter a description for your recipe (optional)"
						autoComplete="New Recipe Description"
						resizable
						onChange={e => setDescription(e)}
					>
						{description}
					</Textarea>
				</Reveal>

				{/* Ingredients */}
				<Reveal width="100%" animation="slide-right" delay={0.2}>
					<h2 className="mt-12 mb-3 text-2xl font-bellefair">Ingredients</h2>
				</Reveal>
				<DynamicList
					type="Ingredient"
					list={ingredients}
					updateList={updatedList => setIngredients(updatedList)}
				/>

				{/* Instructions */}
				<Reveal width="100%" animation="slide-right" delay={0.2}>
					<h2 className="mt-12 mb-3 text-2xl font-bellefair">Instructions</h2>
				</Reveal>
				<DynamicList
					type="Instruction"
					list={instructions}
					updateList={updatedList => setInstructions(updatedList)}
				/>

				{/* Notes */}
				<Reveal width="100%" animation="slide-right" delay={0.2}>
					<h2 className="mt-12 mb-3 text-2xl font-bellefair">Notes</h2>
				</Reveal>
				<Reveal width="100%" animation="slide-bottom" delay={0.2}>
					<Textarea
						className="p-3 text-sm border-2 border-gray-500 rounded-md focus:border-gray-500"
						name="notes"
						id="notes"
						placeholder="Enter some notes about your recipe (optional)"
						autoComplete="New Recipe Notes"
						resizable
						onChange={e => setNotes(e)}
					>
						{notes}
					</Textarea>
				</Reveal>

				{/* Status Message */}
				{statusMSg !== '' && (
					<Reveal width="100%" delay={0.2}>
						<p className="mt-6 text-sm text-center text-gray-500">{statusMSg}</p>
					</Reveal>
				)}

				{/* Submit Button */}
				<Reveal width="100%" animation="slide-bottom" delay={0.2}>
					<div className="flex items-center justify-center w-full mt-6">
						<Button
							type="submit"
							id="submit-create-recipe-form-button"
							className={classNames(
								'text-white bg-zinc-800 py-1.5',
								loading ? 'px-11' : 'px-16',
							)}
							icon={loading ? LoadingIcon : ''}
							iconAlt="Loading Icon"
							iconAnimation="spin"
							disabled={isButtonDisabled}
						>
							{loading ? 'Creating Recipe' : 'Create Recipe'}
						</Button>
					</div>
				</Reveal>
			</form>
		</div>
	);
};

export default AddRecipe;
