import MyRecipesIcon from '../../assets/icons/my-recipes.svg';
import RecipesIcon from '../../assets/icons/recipes.svg';
import SearchIcon from '../../assets/icons/search.svg';

export const tabs = [
	{
		link: '/recipes/all',
		value: 'recipes',
		label: 'Recipes',
		icon: RecipesIcon,
	},
	{
		link: '/recipes/mine',
		value: 'myRecipes',
		label: 'My Recipes',
		icon: MyRecipesIcon,
	},
	{
		link: '/recipes/search',
		value: 'search',
		label: 'Search',
		icon: SearchIcon,
	},
];
