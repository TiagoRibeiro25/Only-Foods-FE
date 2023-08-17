import { useContext, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Recipe } from '../../../../api/requests/recipes/getRecipe';
import DeleteIcon from '../../../../assets/icons/delete.svg';
import LoadingIcon from '../../../../assets/icons/loading.svg';
import ConfirmActionModal from '../../../../components/ConfirmActionModal';
import { UserContext } from '../../../../contextProviders/UserContext';

interface DeleteRecipeButtonProps {
	recipe: Recipe;
}

const DeleteRecipeButton: React.FC<DeleteRecipeButtonProps> = ({ recipe }) => {
	const { loggedUser } = useContext(UserContext);

	const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
	const [deletingRecipe, setDeletingRecipe] = useState<boolean>(false);

	const deleteRecipe = async (): Promise<void> => {
		setShowDeleteModal(false);
		setDeletingRecipe(true);

		setTimeout(() => {
			setDeletingRecipe(false);
		}, 1000);
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
						effect="blur"
						alt="Delete Icon"
						width={20}
						height={20}
					/>
				</button>
			)}

			<ConfirmActionModal
				id="confirm-delete-feed"
				message="Are you sure you want to delete this recipe?"
				onConfirm={deleteRecipe}
				onCancel={() => setShowDeleteModal(false)}
				show={showDeleteModal}
			/>
		</>
	);
};

export default DeleteRecipeButton;
