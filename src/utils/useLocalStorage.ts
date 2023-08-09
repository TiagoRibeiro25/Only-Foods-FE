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
	const result = options.some(option => option.value === filter)
		? (filter as Filter)
		: 'recent';

	return result === 'following' && !isUserLogged ? 'recent' : result;
};

export { getFilterFromLS, getLocalStorage, removeLocalStorage, setLocalStorage };
