import { useContext, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate } from 'react-router-dom';
import requests from '../../../../api/requests';
import { Recipe } from '../../../../api/requests/recipes/getRecipe';
import DeleteIcon from '../../../../assets/icons/delete.svg';
import LoadingIcon from '../../../../assets/icons/loading.svg';
import ConfirmActionModal from '../../../../components/ConfirmActionModal';
import { RecipesContext } from '../../../../contextProviders/RecipesContext';
import { UserContext } from '../../../../contextProviders/UserContext';

interface DeleteRecipeButtonProps {
	recipe: Recipe;
}

const DeleteRecipeButton: React.FC<DeleteRecipeButtonProps> = ({ recipe }) => {
	const navigate = useNavigate();

	const recipesContext = useContext(RecipesContext);
	const { loggedUser } = useContext(UserContext);

	const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
	const [deletingRecipe, setDeletingRecipe] = useState<boolean>(false);

	const deleteRecipe = async (): Promise<void> => {
		setShowDeleteModal(false);
		setDeletingRecipe(true);

		try {
			const response = await requests.recipes.deleteRecipe(recipe.id);

			if (response.data.success) {
				recipesContext.deleteRecipe(recipe.id);
				navigate('/recipes/all');
			}
		} catch (error) {
			console.log('An error occurred while deleting the recipe: ', error);
		} finally {
			setDeletingRecipe(false);
		}
	};

	return (
		<>
			{(recipe.isAuthor || loggedUser?.isAdmin) && (
				<button
					className="flex items-center ml-auto text-sm text-gray-500 sm:ml-4 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
					disabled={deletingRecipe}
					onClick={() => setShowDeleteModal(true)}
				>
					<LazyLoadImage
						src={deletingRecipe ? LoadingIcon : DeleteIcon}
						className={deletingRecipe ? 'animate-spin' : ''}
						effect="opacity"
						alt="Delete Icon"
						width={20}
						height={20}
					/>
				</button>
			)}

			<ConfirmActionModal
				id="confirm-delete-recipe-modal"
				message="Are you sure you want to delete this recipe?"
				onConfirm={deleteRecipe}
				onCancel={() => setShowDeleteModal(false)}
				show={showDeleteModal}
			/>
		</>
	);
};

export default DeleteRecipeButton;
