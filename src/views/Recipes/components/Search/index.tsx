import classNames from 'classnames';
import { useRef, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import requests from '../../../../api/requests';
import SearchIcon from '../../../../assets/icons/search.svg';
import Input from '../../../../components/Input';
import Loading from '../../../../components/Loading';
import Reveal from '../../../../components/Reveal';
import { IRecipe } from '../../../../types/types';
import LoadingRecipes from './components/LoadingRecipes';
import RecipeResult from './components/RecipeResult';

const Search: React.FC = () => {
	const [searchInput, setSearchInput] = useState<string>('');
	const [recipes, setRecipes] = useState<IRecipe[]>();
	const [loading, setLoading] = useState<boolean>(false);

	const searchInputRef = useRef<string>('');
	const loadingRef = useRef<boolean>(false);

	const fetchRecipes = async (searchInput: string): Promise<void> => {
		try {
			const response = await requests.recipes.searchRecipe({
				keyword: searchInput,
				limit: 10,
				page: 1,
			});

			if (response.data.success && response.data.data) {
				setRecipes(response.data.data.recipes);
			}
		} catch (error) {
			console.log('An error occurred while trying to search for recipes: ', error);
			setRecipes(undefined);
		}
	};

	let debounceTimeout: NodeJS.Timeout;

	const debounce = (callback: () => void, delay: number) => {
		clearTimeout(debounceTimeout);
		debounceTimeout = setTimeout(callback, delay);
	};

	const handleInputChange = async (newValue: string): Promise<void> => {
		setSearchInput(newValue);
		searchInputRef.current = newValue;

		if (newValue.trim().length <= 3) {
			setRecipes(undefined);
			setLoading(false);
			loadingRef.current = false;
			return;
		}

		if (loadingRef.current) return;
		setLoading(true);
		loadingRef.current = true;

		debounce(() => {
			fetchRecipes(newValue).finally(() => {
				setLoading(false);
				loadingRef.current = false;

				// If the value changed while fetching, fetch again
				if (newValue !== searchInputRef.current && newValue.trim().length > 3) {
					handleInputChange(searchInputRef.current);
				}
			});
		}, 1000);
	};

	return (
		<div
			className={classNames(
				'flex flex-col items-center pt-12 pb-20 duration-300 ease-in-out',
				searchInput.trim().length > 3 ? 'space-y-8' : 'space-y-20 sm:space-y-32',
			)}
		>
			<Reveal width="100%" animation="fade">
				<h1 className="text-3xl text-center font-bellefair">Search for a recipe</h1>
			</Reveal>

			<Reveal width="100%" animation="slide-bottom" delay={0.05}>
				<div className="flex flex-row items-center py-2">
					<LazyLoadImage
						className="w-5 h-5 mb-3 mr-3"
						src={SearchIcon}
						effect="opacity"
						alt="Search icon"
					/>

					<Input
						type="search"
						id="search"
						name="search"
						placeholder="Search..."
						value={searchInput}
						onChange={handleInputChange}
					/>
				</div>
			</Reveal>

			{loading && <Loading />}

			{loading && !recipes && (
				<div className="w-full space-y-8">
					{Array.from(Array(3).keys()).map(index => (
						<LoadingRecipes key={index} />
					))}
				</div>
			)}

			{recipes && (
				<div className="flex flex-col w-full space-y-8">
					{recipes.map(recipe => (
						<Reveal key={recipe.id} width="100%" animation="slide-right" delay={0.05}>
							<RecipeResult recipe={recipe} />
						</Reveal>
					))}
				</div>
			)}
		</div>
	);
};

export default Search;
