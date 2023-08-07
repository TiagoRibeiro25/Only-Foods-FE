import { useParams } from 'react-router-dom';
import Reveal from '../../components/Reveal';
import Tabs from '../../components/Tabs';
import { tabs } from './tabsData';

const Recipes = () => {
	const { tab } = useParams();

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
		</div>
	);
};

export default Recipes;
