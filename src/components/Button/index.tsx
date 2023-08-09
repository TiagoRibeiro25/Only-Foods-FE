import classNames from 'classnames';
import { LazyLoadImage } from 'react-lazy-load-image-component';

interface ButtonProps {
	type: 'button' | 'submit' | 'reset';
	className?: string;
	icon?: string;
	iconAlt?: string;
	iconAnimation?: 'spin' | 'pulse' | 'ping' | 'bounce' | 'none';
	disabled?: boolean;
	onClick?: () => void;
	children?: React.ReactNode;
}

const Button = (props: ButtonProps) => {
	return (
		<button
			type={props.type}
			className={classNames(
				'inline-flex items-center font-normal text-center transition duration-200 ease-in-out rounded-md text-md disabled:opacity-50 disabled:cursor-default hover:shadow-xl active:shadow-none',
				props.className,
			)}
			disabled={props.disabled}
			onClick={props.onClick}
		>
			<div className="flex items-center">
				{props.icon && (
					<div className="flex mr-2">
						<LazyLoadImage
							src={props.icon}
							alt={props.iconAlt ?? 'Button Icon'}
							className={classNames(
								props.iconAnimation && `animate-${props.iconAnimation}`,
							)}
							width={20}
							height={20}
							effect="opacity"
						/>
					</div>
				)}
				{props.children}
			</div>
		</button>
	);
};

export default Button;
