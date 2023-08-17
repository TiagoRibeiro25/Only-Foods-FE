import classNames from 'classnames';
import { LazyLoadImage } from 'react-lazy-load-image-component';

interface ButtonProps {
	id?: string;
	type: 'button' | 'submit' | 'reset';
	className?: string;
	icon?: string;
	iconAlt?: string;
	iconAnimation?: 'spin' | 'pulse' | 'ping' | 'bounce' | 'none';
	disabled?: boolean;
	onClick?: () => void;
	children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
	id,
	type,
	className,
	icon,
	iconAlt,
	iconAnimation,
	disabled,
	onClick,
	children,
}) => {
	return (
		<button
			{...(id ? { id: id } : {})}
			type={type}
			className={classNames(
				'inline-flex items-center font-normal text-center transition duration-200 ease-in-out rounded-md text-md disabled:opacity-50 disabled:cursor-default hover:shadow-md active:shadow-none',
				className,
			)}
			disabled={disabled}
			onClick={onClick}
		>
			<div className="flex items-center">
				{icon && (
					<div className="flex mr-2">
						<LazyLoadImage
							src={icon}
							alt={iconAlt ?? 'Button Icon'}
							className={classNames(iconAnimation && `animate-${iconAnimation}`)}
							width={20}
							height={20}
							effect="opacity"
						/>
					</div>
				)}
				{children}
			</div>
		</button>
	);
};

export default Button;
