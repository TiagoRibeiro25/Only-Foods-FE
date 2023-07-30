import { useState } from 'react';
import PostTextArea from '../../../../components/PostTextarea';

const NewThoughtForm = () => {
	const [newThoughtText, setNewThoughtText] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [statusMsg, setStatusMsg] = useState('Error Message');

	const handleNewPost = (): void => {
		console.log(newThoughtText);
		setLoading(true);
		setStatusMsg('Error Message');

		//TODO: Remove this
		// Simulate a delay
		setTimeout(() => {
			setLoading(false);
			setStatusMsg('Success Message');
			setNewThoughtText('');

			// After 5 seconds, reset the status message
			setTimeout(() => {
				setStatusMsg('Error Message');
			}, 5000);
		}, 2000);
	};

	return (
		<>
			{/* Add New Thought Form */}
			<PostTextArea
				id="new-thought-textarea"
				labelText="New Thought"
				placeholder="Share your current thought with the world..."
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
