export interface ButtonProps {
	type: 'button' | 'submit' | 'reset';
	padding?: string;
	backgroundColor?: string;
	border?: boolean;
	borderColor?: string;
	textColor?: string;
	icon?: string;
	iconAlt?: string;
	iconAnimation?: 'spin' | 'pulse' | 'ping' | 'bounce' | 'none';
	disabled?: boolean;
	onClick?: () => void;
	children?: React.ReactNode;
}
