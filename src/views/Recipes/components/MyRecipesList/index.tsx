import { Link } from 'react-router-dom';
import Button from '../../../../components/Button';
import Reveal from '../../../../components/Reveal';

const MyRecipesList = () => {
	return (
		<div className="flex flex-col items-center justify-center">
			<div className="flex flex-col w-full sm:flex-row">
				<Link to="/recipes/add" className="w-full sm:w-40">
					<Reveal width="100%" animation="slide-left" delay={0.05}>
						<Button
							id="add-recipe"
							type="button"
							className="py-1.5 text-white px-8 bg-zinc-800 text-center w-full flex justify-center"
						>
							Add Recipe
						</Button>
					</Reveal>
				</Link>
			</div>
		</div>
	);
};

export default MyRecipesList;
