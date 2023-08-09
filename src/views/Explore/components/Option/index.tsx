import classNames from 'classnames';
import { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import Reveal from '../../../../components/Reveal';
import { OptionProps } from '../../types';

const Option = (props: OptionProps) => {
	const [isHovered, setIsHovered] = useState<boolean>(false);

	return (
		<Link
			to={props.path}
			className="mx-10"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div className="max-w-sm overflow-hidden scale-125 shadow-lg cursor-pointer rounded-xl">
				<div className="relative w-72 h-72 sm:w-96 sm:h-96">
					<LazyLoadImage
						src={props.backgroundImage}
						placeholderSrc={props.backgroundImagePlaceholder}
						alt={props.title}
						className="w-full h-auto"
						effect="blur"
					/>
					<div
						className={classNames(
							'absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center py-4 px-2 bg-white bg-opacity-60 duration-500 ease-in-out',
							{ 'backdrop-blur backdrop-filter': isHovered },
						)}
					>
						<h2
							className={classNames(
								'w-full py-2 mb-2 sm:text-3xl text-2xl font-bold text-center font-bellefair',
								{ underline: isHovered },
							)}
						>
							{props.title}
						</h2>
						{isHovered && (
							<Reveal width="100%" animation="slide-bottom" delay={0} duration={0.3}>
								<p className="text-sm text-center text-gray-700 sm:text-md">
									{props.description}
								</p>
							</Reveal>
						)}
					</div>
				</div>
			</div>
		</Link>
	);
};

export default Option;
