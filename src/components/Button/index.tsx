interface ButtonProps {
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

const Button = ({ ...props }: ButtonProps) => {
	const buttonStyle = {
		backgroundColor: props.backgroundColor ?? '#333333',
		color: props.textColor ?? '#FFFFFF',
		padding: props.padding ?? '0.75rem 1.5rem',
		border: props.border ? `1px solid ${props.borderColor ?? '#050708'}` : 'none',
	};

	return (
		<button
			type={props.type}
			style={buttonStyle}
			className="inline-flex items-center font-normal text-center transition-transform duration-300 ease-in-out rounded-md text-md hover:scale-105 disabled:opacity-50 disabled:cursor-default disabled:scale-100"
			disabled={props.disabled}
			onClick={props.onClick}
		>
			{props.icon && (
				<img
					src={props.icon}
					alt={props.iconAlt ?? 'Button Icon'}
					className={`mr-2 ml-1 animate-${props.iconAnimation ?? 'none'}`}
					width={20}
					height={20}
				/>
			)}
			{props.children}
		</button>
	);
};

export default Button;
