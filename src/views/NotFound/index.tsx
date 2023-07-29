import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import Reveal from '../../components/Reveal';

const NotFound = () => {
	return (
		<div className="flex items-center justify-center w-full min-h-[70vh] text-gray-900 my-12 px-4">
			<Reveal width="100%" animation="fade" delay={0.03}>
				<div className="flex flex-col items-center w-full gap-8">
					<h1 className="w-full font-black text-center text-gray-600 select-none text-8xl md:text-16xl">
						404
					</h1>
					<h2 className="w-full text-4xl text-center font-bellefair">Are you lost?</h2>
					<p className="w-full text-xl font-black text-center">
						It looks like the page you're looking for doesn't exist. But don't worry, we
						can get you back on track!
					</p>
					<Link to="/">
						<Button type="button">Go back home</Button>
					</Link>
				</div>
			</Reveal>
		</div>
	);
};

export default NotFound;
