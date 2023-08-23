import { Option } from '../components/Select';

const PRE_KEY = 'only-foods_';

const getLocalStorage = (key: string) => {
	const finalKey = PRE_KEY + key;
	return localStorage[finalKey] ? localStorage[finalKey] : null;
};

const setLocalStorage = (key: string, value: string) => {
	const finalKey = PRE_KEY + key;
	localStorage[finalKey] = value;
};

const removeLocalStorage = (key: string) => {
	const finalKey = PRE_KEY + key;
	localStorage.removeItem(finalKey);
};

interface GetFilterFromLSProps {
	key: string;
	isUserLogged: boolean;
	options: Option[];
}

export type Filter = 'recent' | 'popular' | 'following';

const getFilterFromLS = (props: GetFilterFromLSProps): Filter => {
	const { key, isUserLogged, options } = props;

	const filter = getLocalStorage(key);

	if (filter === 'following' && !isUserLogged) {
		return options.find(option => option.default)?.value as Filter;
	}

	if (options.some(option => option.value === filter)) {
		return filter as Filter;
	}

	return options.find(option => option.default)?.value as Filter;
};

export { getFilterFromLS, getLocalStorage, removeLocalStorage, setLocalStorage };
