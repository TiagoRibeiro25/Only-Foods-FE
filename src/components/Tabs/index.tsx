import { Link } from 'react-router-dom';
import { TabProps } from './types';

const Tabs = (props: TabProps) => {
	return (
		<div className="w-full border-b border-gray-700">
			<ul className="flex flex-wrap justify-center -mb-px text-sm font-medium text-center text-gray-500">
				{props.elements.map(element => (
					<li key={element.value} className="mr-4 sm:mr-2">
						<Link
							to={element.link}
							className={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg group ${
								props.selected === element.value
									? 'text-gray-600 border-gray-600 active'
									: 'border-transparent'
							}`}
						>
							<img
								className="w-6 h-6 sm:w-5 sm:h-5 sm:mr-2"
								src={element.icon}
								alt={element.label}
							/>
							<span className="hidden sm:block">{element.label}</span>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Tabs;
