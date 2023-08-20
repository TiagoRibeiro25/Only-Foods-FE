import { Link } from 'react-router-dom';
import Button from '../Button';
import Reveal from '../Reveal';

const AddBottomRightButton: React.FC = () => {
	return (
		<div className="fixed right-5 bottom-5 group">
			<Reveal>
				<Link to="/recipes/add">
					<Button
						type="button"
						id="add-recipe-button"
						className="z-20 flex items-center justify-center p-3 text-white rounded-full bg-zinc-800 hover:bg-zinc-950 hover:shadow-xl focus:bg-zinc-950 focus:shadow-xl focus:outline-none focus:ring-0 active:bg-zinc-950 active:shadow-xl"
					>
						<svg
							className="w-4 h-4 transition-transform group-hover:rotate-45"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 18 18"
						>
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M9 1v16M1 9h16"
							/>
						</svg>
						<span className="sr-only">Add new recipe</span>
					</Button>
				</Link>
			</Reveal>
		</div>
	);
};

export default AddBottomRightButton;
