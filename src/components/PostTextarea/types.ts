export interface PostTextAreaProps {
	id: string;
	labelText: string;
	placeholder: string;
	value: string;
	loading: boolean;
	buttonDisabled?: boolean;
	buttonText?: string;
	resizable?: boolean;
	rows?: number;
	cols?: number;
	minLength?: number;
	maxLength?: number;
	onChange: (value: string) => void;
	onSubmit: () => void;
}
