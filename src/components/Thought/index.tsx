import { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link, useNavigate } from 'react-router-dom';
import requests from '../../api/requests';
import CancelIcon from '../../assets/icons/cancel.svg';
import DeleteIcon from '../../assets/icons/delete.svg';
import EditIcon from '../../assets/icons/edit.svg';
import LoadingIcon from '../../assets/icons/loading.svg';
import UserPlaceholderPicture from '../../assets/imgs/user.png';
import ConfirmActionModal from '../ConfirmActionModal';
import HTMLText from '../HTMLText';
import PostTextArea from '../PostTextarea';
import PostUserActions from '../PostUserActions';
import { ThoughtProps } from './types';

const Thought = (props: ThoughtProps) => {
	const navigate = useNavigate();
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
			const response = await requests.thoughts.deleteThought({ id: props.thought.id });

			if (response.data.success) {
				props.onDelete(props.thought.id);
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
				id: props.thought.id,
				content: editedPost,
			});

			if (response.data.success) {
				props.onEdit(props.thought.id, editedPost);
				setEditModeEnabled(false);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setEditingPost(false);
		}
	};

	useEffect(() => {
		setEditedPost(props.thought.content);
	}, [editModeEnabled, props.thought.content]);

	return (
		<div id={`post-${props.thought.id}`} className="mb-16">
			{/* First Row */}
			<div className="flex flex-row">
				<Link to={`/profile/${props.thought.isAuthor ? 'me' : props.thought.author.id}`}>
					<LazyLoadImage
						className="rounded-full"
						src={
							props.thought.author.userImage?.cloudinaryImage ?? UserPlaceholderPicture
						}
						placeholderSrc={UserPlaceholderPicture}
						alt="User Profile Picture"
						effect="opacity"
						style={{ width: '55px', height: '55px' }}
					/>
				</Link>

				<div className="flex flex-col ml-4">
					<h3 className="text-lg font-semibold">
						<Link
							to={`/profile/${props.thought.isAuthor ? 'me' : props.thought.author.id}`}
							className="hover:underline"
						>
							{props.thought.author.username}{' '}
						</Link>
						{props.thought.isAuthor && (
							<span className="text-sm text-gray-500">(You)</span>
						)}
					</h3>
					<p className="text-sm text-gray-500">
						{props.thought.createdAgo}{' '}
						{props.thought.edited && (
							<span className="text-sm text-gray-500">(edited)</span>
						)}
					</p>
				</div>

				{/* Actions - Edit / Delete */}
				<div className="flex items-center justify-end flex-1">
					<div className="flex flex-row items-center justify-end">
						{/* Edit Post */}
						{props.thought.isAuthor && !props.isBlocked && (
							<button
								className="text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
								disabled={deletingPost || editingPost}
								onClick={() => setEditModeEnabled(!editModeEnabled)}
							>
								<LazyLoadImage
									src={editModeEnabled ? CancelIcon : EditIcon}
									effect="opacity"
									alt="Edit Icon"
									width={20}
									height={20}
								/>
							</button>
						)}

						{/* Delete Post */}
						{(props.thought.isAuthor || props.isAdmin) && (
							<button
								className="ml-4 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
								disabled={editModeEnabled || deletingPost}
								onClick={() => setShowDeleteModal(true)}
							>
								<LazyLoadImage
									src={deletingPost ? LoadingIcon : DeleteIcon}
									className={deletingPost ? 'animate-spin' : ''}
									effect="opacity"
									alt="Edit Icon"
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
						onClick={() => navigate(`/thought/${props.thought.id}`)}
					>
						<HTMLText text={props.thought.content} />
					</div>
				) : (
					<PostTextArea
						id={`post-${props.thought.id}-edit`}
						labelText="Edit Post"
						placeholder="What are you thinking about?"
						buttonText="Apply Changes"
						buttonDisabled={editedPost.trim() === props.thought.content.trim()}
						maxLength={1000}
						loading={editingPost}
						value={editedPost}
						onChange={setEditedPost}
						onSubmit={editPost}
					/>
				)}
			</div>
			{/* Third Row */}
			<div className="flex flex-row gap-3 mt-2">
				<PostUserActions
					type="thought"
					id={props.thought.id}
					likes={props.thought.likes}
					comments={props.thought.comments}
					isLiked={props.thought.isLiked}
					onLikeUpdate={props.onLikeUpdate}
				/>
			</div>
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
