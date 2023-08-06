export interface CheckBoxProps {
	placeholder: string;
	id: string;
	name: string;
	autoComplete?: string;
	disabled?: boolean;
	onChange: (value: boolean) => void;
}
