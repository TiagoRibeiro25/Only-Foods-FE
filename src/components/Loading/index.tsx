import { LazyLoadImage } from 'react-lazy-load-image-component';
import LoadingIcon from '../../assets/icons/loading.svg';
import Reveal from '../Reveal';

interface LoadingProps {
	width?: number;
	height?: number;
}

const Loading: React.FC<LoadingProps> = ({ width, height }) => {
	return (
		<Reveal width="100%" animation="fade" delay={0}>
			<div className="flex items-center justify-center px-1 py-1">
				<LazyLoadImage
					src={LoadingIcon}
					alt="Loading Icon"
					className="ml-1 mr-2 animate-spin"
					width={width ?? 35}
					height={height ?? 35}
					effect="opacity"
				/>
			</div>
		</Reveal>
	);
};

export default Loading;
