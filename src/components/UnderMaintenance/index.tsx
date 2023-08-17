import classNames from 'classnames';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import MaintenanceImg from '../../assets/imgs/maintenance.webp';
import MaintenanceImgPlaceholder from '../../assets/imgs/placeholders/maintenance_loading.webp';
import Reveal from '../Reveal';

interface UnderMaintenanceProps {
	viewName: string;
	className?: string;
}

const UnderMaintenance: React.FC<UnderMaintenanceProps> = ({ viewName, className }) => {
	return (
		<div
			className={classNames(
				'flex flex-col items-center justify-center max-w-2xl',
				className,
			)}
		>
			<Reveal width="100%" animation="fade" delay={0.1} duration={1}>
				<LazyLoadImage
					src={MaintenanceImg}
					placeholderSrc={MaintenanceImgPlaceholder}
					effect="blur"
					alt="Under Maintenance"
				/>

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
