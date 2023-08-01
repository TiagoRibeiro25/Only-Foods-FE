import { useState } from 'react';
import requests from '../../../../api/requests';
import PostTextArea from '../../../../components/PostTextarea';

export interface NewThought {
	id: number;
	content: string;
	authorId: number;
	createdAt: string;
	updatedAt: string;
}

interface NewThoughtFormProps {
	onSubmit: (arg: NewThought) => void;
}

const NewThoughtForm = (props: NewThoughtFormProps) => {
	const [newThoughtText, setNewThoughtText] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [statusMsg, setStatusMsg] = useState('Error Message');

	const handleNewPost = async (): Promise<void> => {
		setLoading(true);
		setStatusMsg('Error Message');

		try {
			const response = await requests.thoughts.addThought({
				content: newThoughtText,
			});

			setStatusMsg(response.data.message);

			if (response.data.success) {
				setNewThoughtText('');
				props.onSubmit(response.data.data as NewThought);
			}
		} catch (error) {
			console.log(error);
			setStatusMsg('An error occurred. Please try again.');
		} finally {
			setLoading(false);

			// Hide status message and clear the textarea input after 5 seconds
			setTimeout(() => {
				setStatusMsg('Error Message');
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
					style={{ visibility: statusMsg === 'Error Message' ? 'hidden' : 'visible' }}
				>
					{statusMsg}
				</p>
			</div>
		</>
	);
};

export default NewThoughtForm;
