import classNames from 'classnames';
import MaintenanceImg from '../../assets/imgs/maintenance.png';
import Reveal from '../Reveal';
import { UnderMaintenanceProps } from './types';

const UnderMaintenance = ({ viewName, className }: UnderMaintenanceProps) => {
	return (
		<div
			className={classNames(
				'flex flex-col items-center justify-center max-w-2xl',
				className,
			)}
		>
			<Reveal width="100%" animation="fade" delay={0.1} duration={1}>
				<img src={MaintenanceImg} alt="tailwindcss maintenance" />
				<h1 className="mb-3 text-4xl font-bold text-center text-gray-900 font-bellefair">
					Under Development
				</h1>
				<p className="text-center text-gray-600 ">
					{viewName} is currently under development. Please check back later.
				</p>

				<div className="flex flex-col items-center justify-center">
					<a
						href="https://github.com/TiagoRibeiro25/Only-Foods-FE"
						target="_blank"
						rel="noreferrer"
						className="mt-4 text-sm text-gray-500 hover:text-gray-600 hover:underline"
					>
						Keep up with Only Foods updates
					</a>
				</div>
			</Reveal>
		</div>
	);
};

export default UnderMaintenance;
