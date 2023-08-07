import { useParams } from 'react-router-dom';
import Reveal from '../../components/Reveal';
import Tabs from '../../components/Tabs';
import MyRecipesList from './components/MyRecipesList';
import RecipesList from './components/RecipesList';
import Search from './components/Search';
import { tabs } from './tabsData';

const Recipes = () => {
	const { tab } = useParams();

	const renderForm = (): React.JSX.Element => {
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
					elements={tabs}
					selected={
						tabs.find(element => element.link.split('/')[2] === tab)?.value ??
						tabs[0].value
					}
				/>
			</Reveal>

			<div className="mt-8">{renderForm()}</div>
		</div>
	);
};

export default Recipes;
