import Reveal from '../Reveal';
import { NoItemsFoundProps } from './types';

const NoItemsFound = (props: NoItemsFoundProps) => {
	return (
		<Reveal width="100%" animation="slide-bottom" delay={0.3}>
			<div className="flex flex-col items-center justify-center gap-2 pt-8 pb-12 text-center col-span-full md:pb-6">
				<svg
					fill="#878d98"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
					className="w-14 text-primary-text-color dark:text-primary-text-color"
				>
					<path d="M4 2v18H3v2h4v-2H6v-5h13a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H6V2H4zm4 3v2h2V5h2v2h2V5h2v2h2v2h-2v2h2v2h-2v-2h-2v2h-2v-2h-2v2H8v-2H6V9h2V7H6V5h2z"></path>
					<path d="M8 9h2v2H8zm4 0h2v2h-2zm-2-2h2v2h-2zm4 0h2v2h-2z"></path>
				</svg>
				<p className="text-primary-text-color dark:text-primary-text-color">
					{props.warning}
				</p>
				<p className="text-primary-text-color dark:text-primary-text-color">
					{props.message ?? ''}
				</p>
			</div>
		</Reveal>
	);
};

export default NoItemsFound;
