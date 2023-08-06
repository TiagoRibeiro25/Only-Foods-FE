interface Option {
	text: string;
	value: string;
}

export interface SelectProps {
	id: string;
	labelText: string;
	value: string;
	options: Option[];
	onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
