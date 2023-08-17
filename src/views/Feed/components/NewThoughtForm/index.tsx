import { useContext, useState } from 'react';
import requests from '../../../../api/requests';
import PostTextArea from '../../../../components/PostTextarea';
import { ThoughtsContext } from '../../../../contextProviders/ThoughtsContext';
import { UserContext } from '../../../../contextProviders/UserContext';

const NewThoughtForm: React.FC = () => {
	const thoughtsContext = useContext(ThoughtsContext);
	const { loggedUser } = useContext(UserContext);

	const [newThoughtText, setNewThoughtText] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [statusMsg, setStatusMsg] = useState<string>('');

	const handleNewPost = async (): Promise<void> => {
		setLoading(true);
		setStatusMsg('');

		try {
			const response = await requests.thoughts.addThought({
				content: newThoughtText,
			});

			setStatusMsg(response.data.message);

			if (response.data.success && response.data.data) {
				setNewThoughtText('');

				// Add the new thought to the recent thoughts
				thoughtsContext.handleNewThought({
					id: response.data.data.id,
					content: response.data.data.content,
					edited: false,
					author: {
						id: response.data.data.authorId,
						username: loggedUser?.username ?? '',
						userImage: loggedUser?.picture
							? { cloudinaryImage: loggedUser?.picture }
							: undefined,
					},
					likes: 0,
					comments: 0,
					isAuthor: true,
					isLiked: false,
					createdAt: response.data.data.createdAt,
				});
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
			{/* Add New Thought Form */}
			<PostTextArea
				id="new-thought-textarea"
				labelText="New Thought"
				placeholder="Share your current thought with the world..."
				buttonText="Post Thought"
				maxLength={1000}
				value={newThoughtText}
				loading={loading}
				onChange={setNewThoughtText}
				onSubmit={handleNewPost}
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

export default NewThoughtForm;
