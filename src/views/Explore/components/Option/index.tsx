import classNames from 'classnames';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../../../../components/Reveal';
import { OptionProps } from '../../types';

const Option = (props: OptionProps) => {
	const [isHovered, setIsHovered] = useState<boolean>(false);

	return (
		<Link to={props.path} className="mx-10">
			<div
				className="max-w-sm overflow-hidden shadow-lg cursor-pointer sm:scale-125 rounded-xl"
				style={{
					backgroundImage: `url("${props.backgroundImage}")`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				<div
					className={classNames(
						'flex flex-col items-center justify-center py-4 px-2 bg-white bg-opacity-60 sm:w-96 sm:h-96 w-72 h-72 duration-500 ease-in-out',
						{ 'backdrop-blur backdrop-filter': isHovered },
					)}
				>
					<h2
						className={classNames(
							'w-full py-2 mb-2 sm:text-3xl text-4xl font-bold text-center font-bellefair',
							{ underline: isHovered },
						)}
					>
						{props.title}
					</h2>
					{isHovered && (
						<Reveal width="100%" animation="slide-bottom" delay={0} duration={0.3}>
							<p className="text-base text-center text-gray-700">{props.description}</p>
						</Reveal>
					)}
				</div>
			</div>
		</Link>
	);
};

export default Option;
