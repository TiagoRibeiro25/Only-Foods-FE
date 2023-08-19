import { useContext, useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link, useNavigate } from 'react-router-dom';
import requests from '../../api/requests';
import CancelIcon from '../../assets/icons/cancel.svg';
import DeleteIcon from '../../assets/icons/delete.svg';
import EditIcon from '../../assets/icons/edit.svg';
import LoadingIcon from '../../assets/icons/loading.svg';
import UserPlaceholderPicture from '../../assets/imgs/user.webp';
import { ThoughtsContext } from '../../contextProviders/ThoughtsContext';
import { IThought } from '../../types/types';
import formatData from '../../utils/formatData';
import ConfirmActionModal from '../ConfirmActionModal';
import HTMLText from '../HTMLText';
import PostTextArea from '../PostTextarea';
import PostUserActions from '../PostUserActions';

interface ThoughtProps {
	thought: IThought;
	isAdmin: boolean;
	isBlocked: boolean;
}

const Thought: React.FC<ThoughtProps> = ({ thought, isAdmin, isBlocked }) => {
	const navigate = useNavigate();
	const thoughtsContext = useContext(ThoughtsContext);

	const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
	const [deletingPost, setDeletingPost] = useState<boolean>(false);
	const [editModeEnabled, setEditModeEnabled] = useState<boolean>(false);
	const [editingPost, setEditingPost] = useState<boolean>(false);
	const [editedPost, setEditedPost] = useState<string>('');

	// Function to delete a post
	const deletePost = async (): Promise<void> => {
		setDeletingPost(true);
		setShowDeleteModal(false);

		try {
			const response = await requests.thoughts.deleteThought(thought.id);

			if (response.data.success) {
				thoughtsContext.deleteThought(thought.id);
				navigate('/');
			}
		} catch (error) {
			console.log(error);
		} finally {
			setDeletingPost(false);
		}
	};

	// Function to edit a post
	const editPost = async (): Promise<void> => {
		setEditingPost(true);

		try {
			const response = await requests.thoughts.editThought({
				id: thought.id,
				content: editedPost,
			});

			if (response.data.success) {
				thought.content = editedPost;
				thought.edited = true;
				thoughtsContext.editThought(thought.id, editedPost);
				setEditModeEnabled(false);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setEditingPost(false);
		}
	};

	useEffect(() => {
		setEditedPost(thought.content);
	}, [editModeEnabled, thought.content]);

	return (
		<div id={`post-${thought.id}`} className="mb-16">
			{/* First Row */}
			<div className="flex flex-row">
				<Link to={`/profile/${thought.isAuthor ? 'me' : thought.author.id}`}>
					<LazyLoadImage
						className="rounded-full"
						src={thought.author.userImage?.cloudinaryImage ?? UserPlaceholderPicture}
						alt="User Profile Picture"
						effect="blur"
						style={{ width: '55px', height: '55px' }}
					/>
				</Link>

				<div className="flex flex-col ml-4">
					<h3 className="text-lg font-semibold">
						<Link
							to={`/profile/${thought.isAuthor ? 'me' : thought.author.id}`}
							className="hover:underline"
						>
							{thought.author.username}{' '}
						</Link>
						{thought.isAuthor && <span className="text-sm text-gray-500">(You)</span>}
					</h3>
					<p className="text-sm text-gray-500">
						{formatData.timeAgo(thought.createdAt)}{' '}
						{thought.edited && <span className="text-sm text-gray-500">(edited)</span>}
					</p>
				</div>

				{/* Actions - Edit / Delete */}
				<div className="flex items-center justify-end flex-1">
					<div className="flex flex-row items-center justify-end">
						{/* Edit Post */}
						{thought.isAuthor && !isBlocked && (
							<button
								className="text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
								disabled={deletingPost || editingPost}
								onClick={() => setEditModeEnabled(!editModeEnabled)}
							>
								<LazyLoadImage
									src={editModeEnabled ? CancelIcon : EditIcon}
									effect="blur"
									alt="Edit Icon"
									width={20}
									height={20}
								/>
							</button>
						)}

						{/* Delete Post */}
						{(thought.isAuthor || isAdmin) && (
							<button
								className="ml-4 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
								disabled={editModeEnabled || deletingPost}
								onClick={() => setShowDeleteModal(true)}
							>
								<LazyLoadImage
									src={deletingPost ? LoadingIcon : DeleteIcon}
									className={deletingPost ? 'animate-spin' : ''}
									effect="blur"
									alt="Delete Icon"
									width={20}
									height={20}
								/>
							</button>
						)}
					</div>
				</div>
			</div>
			{/* Second Row */}
			<div className="my-4">
				{!editModeEnabled ? (
					<div
						className="hover:cursor-pointer"
						onClick={() => navigate(`/thought/${thought.id}`)}
					>
						<HTMLText text={thought.content} />
					</div>
				) : (
					<PostTextArea
						id={`post-${thought.id}-edit`}
						labelText="Edit Post"
						placeholder="What are you thinking about?"
						buttonText="Apply Changes"
						buttonDisabled={editedPost.trim() === thought.content.trim()}
						maxLength={1000}
						loading={editingPost}
						value={editedPost}
						onChange={setEditedPost}
						onSubmit={editPost}
					/>
				)}
			</div>

			{/* Third Row */}
			<PostUserActions
				type="thought"
				id={thought.id}
				likes={thought.likes}
				comments={thought.comments}
				isLiked={thought.isLiked}
				onLikeUpdate={(id, newLikes, isLiked) => {
					thought.isLiked = isLiked;
					thought.likes = newLikes;
					thoughtsContext.updateLikes(id, newLikes, isLiked);
				}}
			/>

			<ConfirmActionModal
				id="confirm-delete-post"
				message="Are you sure you want to delete this post?"
				onConfirm={deletePost}
				onCancel={() => setShowDeleteModal(false)}
				show={showDeleteModal}
			/>
		</div>
	);
};

export default Thought;
