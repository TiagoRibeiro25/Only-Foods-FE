export interface InputProps {
	placeholder: string;
	type: 'text' | 'password' | 'email' | 'number' | 'tel';
	name: string;
	id: string;
	value: string;
	required: boolean;
	disabled?: boolean;
	autoComplete?: string;
	onChange: (value: string) => void;
}
