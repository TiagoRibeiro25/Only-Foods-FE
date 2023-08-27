import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import UsersIcon from '../../assets/icons/group.svg';
import RecipeIcon from '../../assets/icons/recipe.svg';
import Reveal from '../../components/Reveal';

const Search: React.FC = () => {
	return (
		<div className="flex flex-col items-center justify-center max-w-3xl mx-auto sm:mt-52 mt-28">
			<Reveal width="100%" animation="fade" delay={0.05}>
				<h1 className="text-3xl text-center font-bellefair">What are you looking for?</h1>
			</Reveal>

			<div className="mx-5 mt-20 space-y-10">
				<Reveal width="100%" animation="slide-left" delay={0.5}>
					<Link
						to="/users/search"
						className="flex flex-row transition duration-300 ease-in-out border rounded-lg shadow bg-zinc-50 hover:scale-105 hover:bg-zinc-100"
					>
						<div className="flex items-center justify-center w-24 mr-2">
							<LazyLoadImage
								src={UsersIcon}
								alt="Users Icon"
								className="w-20 h-20"
								effect="blur"
							/>
						</div>
						<div className="flex flex-col justify-center pr-3">
							<h2 className="text-2xl font-bellefair">Users</h2>
							<p className="text-md">Find users by their username.</p>
						</div>
					</Link>
				</Reveal>

				<Reveal width="100%" animation="slide-right" delay={1}>
					<Link
						to="/recipes/search"
						className="flex flex-row transition duration-300 ease-in-out border rounded-lg shadow bg-zinc-50 hover:scale-105 hover:bg-zinc-100"
					>
						<div className="flex items-center justify-center w-24 py-3 mr-2">
							<LazyLoadImage
								src={RecipeIcon}
								alt="Recipe Icon"
								className="w-14 h-14"
								effect="blur"
							/>
						</div>
						<div className="flex flex-col justify-center pr-3">
							<h2 className="text-2xl font-bellefair">Recipes</h2>
							<p className="text-md">Find recipes by their title.</p>
						</div>
					</Link>
				</Reveal>
			</div>
		</div>
	);
};

export default Search;
