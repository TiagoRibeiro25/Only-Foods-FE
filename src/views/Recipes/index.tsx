import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import Reveal from '../../components/Reveal';
import Tabs from '../../components/Tabs';
import { UserContext } from '../../contextProviders/UserContext';
import MyRecipesList from './components/MyRecipesList';
import RecipesList from './components/RecipesList';
import Search from './components/Search';
import { tabs } from './tabsData';

const Recipes = () => {
	const { tab } = useParams();
	const { loggedUser } = useContext(UserContext);

	const renderView = (): React.JSX.Element => {
		switch (tab) {
			case 'all':
				return <RecipesList />;
			case 'mine':
				return <MyRecipesList />;
			case 'search':
				return <Search />;
			default:
				return <RecipesList />;
		}
	};

	return (
		<div className="max-w-3xl mx-auto mt-28">
			<Reveal width="100%" animation="slide-top" delay={0.05}>
				<Tabs
					id="recipes-tabs"
					elements={
						loggedUser ? tabs : tabs.filter(element => element.value !== 'myRecipes')
					}
					selected={
						tabs.find(element => element.link.split('/')[2] === tab)?.value ??
						tabs[0].value
					}
				/>
			</Reveal>

			<div className="mt-8">{renderView()}</div>
		</div>
	);
};

export default Recipes;
