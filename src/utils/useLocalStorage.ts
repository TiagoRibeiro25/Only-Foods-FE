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

export { getLocalStorage, removeLocalStorage, setLocalStorage };
