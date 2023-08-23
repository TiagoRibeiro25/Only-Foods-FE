import { Option } from '../../../../components/Select';

export const options: Option[] = [
	{ text: 'Recent', value: 'recent', default: false },
	{ text: 'Most Popular', value: 'popular', default: true },
	{ text: 'Following', value: 'following', default: false },
];
