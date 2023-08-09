export interface ButtonProps {
	type: 'button' | 'submit' | 'reset';
	className?: string;
	icon?: string;
	iconAlt?: string;
	iconAnimation?: 'spin' | 'pulse' | 'ping' | 'bounce' | 'none';
	disabled?: boolean;
	onClick?: () => void;
	children?: React.ReactNode;
}
