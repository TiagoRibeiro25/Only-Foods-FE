import RecipesBackgroundImage from '../../assets/imgs/explore_recipes.png';
import ThoughtsBackgroundImage from '../../assets/imgs/explore_thoughts.png';
import Option from './components/Option';

const Explore = () => {
	return (
		<>
			<h1 className="mt-24 text-4xl font-bold text-center text-gray-800 font-bellefair sm:mt-36">
				What would you like to explore first?
			</h1>

			<div className="flex flex-col items-center justify-center max-w-5xl mx-auto mt-24 lg:flex-row">
				<div className="flex items-center justify-center w-1/2 lg:justify-start">
					<Option
						title="Thoughts"
						path="/feed"
						description="See what others are thinking about and share your thoughts with the world."
						backgroundImage={ThoughtsBackgroundImage}
					/>
				</div>

				<div className="flex items-center justify-center w-1/2 my-20 lg:justify-end sm:my-44 lg:my-0">
					<Option
						title="Recipes"
						path="/recipes"
						description="Find new recipes and share your own recipes with others to try."
						backgroundImage={RecipesBackgroundImage}
					/>
				</div>
			</div>
		</>
	);
};

export default Explore;
