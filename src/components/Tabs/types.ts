export interface TabProps {
	id: string;
	elements: {
		link: string;
		value: string;
		icon: string;
		label: string;
	}[];
	selected: string;
}
