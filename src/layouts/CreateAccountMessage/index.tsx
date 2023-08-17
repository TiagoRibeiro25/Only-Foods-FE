import { Link, useLocation } from 'react-router-dom';

const CreateAccountMessage: React.FC = () => {
	const location = useLocation();

	return (
		location.pathname !== '/' && (
			<div className="fixed bottom-0 right-0 flex items-center justify-center w-full py-4 bg-white bg-opacity-90">
				<div className="text-center">
					<h2 className="mb-1 text-2xl font-bellefair">Join Us Today!</h2>
					<p className="hidden text-sm lg:block">
						Discover the benefits of an account. It's fast, simple, and free!
					</p>
					<Link
						to="/?form=register"
						className="inline-block text-xl font-semibold transition duration-300 rounded-full sm:mt-2 font-bellefair hover:underline"
					>
						Create Your Free Account
					</Link>
				</div>
			</div>
		)
	);
};

export default CreateAccountMessage;
