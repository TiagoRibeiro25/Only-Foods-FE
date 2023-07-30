import { useState } from 'react';
import PostTextArea from '../../components/PostTextarea';
import Reveal from '../../components/Reveal';

const Feed = () => {
	const [newThoughtText, setNewThoughtText] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [statusMsg, setStatusMsg] = useState('Error Message');

	const handleNewPost = (): void => {
		console.log(newThoughtText);
		setLoading(true);
		setStatusMsg('Error Message');

		// Simulate a delay
		//TODO: Remove this
		setTimeout(() => {
			setLoading(false);
			setStatusMsg('Success Message');
			setNewThoughtText('');
		}, 2000);
	};

	return (
		<div className="flex flex-col items-center max-w-3xl mx-auto mt-28">
			<Reveal width="100%" animation="slide-top" delay={0.05}>
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
			</Reveal>
		</div>
	);
};

export default Feed;
