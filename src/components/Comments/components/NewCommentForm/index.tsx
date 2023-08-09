import { useContext, useState } from 'react';
import { CommentsProps } from '../..';
import requests from '../../../../api/requests';
import PostTextArea from '../../../../components/PostTextarea';
import { UserContext } from '../../../../contextProviders/UserContext';
import { IComment } from '../../../../types/types';

interface NewCommentFormProps extends CommentsProps {
	onSubmit: (arg: NewComment) => void;
}

export interface NewComment extends Omit<IComment, 'id'> {}

const NewCommentForm = (props: NewCommentFormProps) => {
	const { loggedUser } = useContext(UserContext);

	const [newCommentText, setNewCommentText] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [statusMsg, setStatusMsg] = useState<string>('');

	const handleNewComment = async (): Promise<void> => {
		setLoading(true);
		setStatusMsg('');

		try {
			const type = props.type === 'thought' ? 'thoughts' : 'recipes';

			const response = await requests[type].addComment({
				id: props.id,
				content: newCommentText,
			});

			setStatusMsg(response.data.message);

			if (response.data.success) {
				const newComment: NewComment = {
					content: newCommentText,
					author: {
						id: loggedUser?.id as number,
						username: loggedUser?.username as string,
						userImage: {
							cloudinaryImage: loggedUser?.picture as string,
						},
					},
					createdAt: new Date().toISOString(),
				};

				setNewCommentText('');
				props.onSubmit(newComment);
			}
		} catch (error) {
			console.log(error);
			setStatusMsg('An error occurred. Please try again.');
		} finally {
			setLoading(false);

			// Hide status message and clear the textarea input after 5 seconds
			setTimeout(() => {
				setStatusMsg('');
			}, 5000);
		}
	};

	return (
		<>
			{/* Add New Comment Form */}
			<PostTextArea
				id="new-comment-textarea"
				labelText="New Comment"
				placeholder={`Share your thoughts about this ${
					props.type === 'thought' ? 'post' : 'recipe'
				}...`}
				buttonText="Post Comment"
				minLength={4}
				maxLength={2000}
				value={newCommentText}
				loading={loading}
				onChange={setNewCommentText}
				onSubmit={handleNewComment}
			/>

			{/* Status Message */}
			<div className="w-full my-3 text-center">
				<p
					className="text-sm text-gray-950"
					style={{ visibility: statusMsg === '' ? 'hidden' : 'visible' }}
				>
					{statusMsg}
				</p>
			</div>
		</>
	);
};

export default NewCommentForm;
