import Reveal from '../../components/Reveal';
import NewThoughtForm from './components/NewThoughtForm';

const Feed = () => {
	return (
		<div className="flex flex-col items-center max-w-3xl mx-auto mt-28">
			<Reveal width="100%" animation="slide-top" delay={0.05}>
				<NewThoughtForm onSubmit={() => console.log('New Thought Submitted!')} />
			</Reveal>
		</div>
	);
};

export default Feed;
