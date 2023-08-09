import classNames from 'classnames';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';

interface TabProps {
	id: string;
	elements: {
		link: string;
		value: string;
		icon: string;
		label: string;
	}[];
	selected: string;
}

const Tabs = (props: TabProps) => {
	return (
		<div className="w-full border-b border-gray-700">
			<ul className="flex flex-wrap justify-center -mb-px text-sm font-medium text-center text-gray-500">
				{props.elements.map(element => (
					<li key={element.value} className="mx-2 sm:mx-1">
						<Link
							to={element.link}
							className={classNames(
								'inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg group',
								props.selected === element.value
									? 'text-gray-600 border-gray-600 active'
									: 'border-transparent',
							)}
						>
							<LazyLoadImage
								className="w-6 h-6 mr-2 sm:w-5 sm:h-5"
								src={element.icon}
								srcSet={element.icon}
								alt={element.label}
								effect="opacity"
							/>
							<span
								className={classNames(
									props.elements.length >= 3 ? 'hidden sm:block' : 'block',
								)}
							>
								{element.label}
							</span>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Tabs;
