import { LazyLoadImage } from 'react-lazy-load-image-component';
import LoadingIcon from '../../assets/icons/loading.svg';

interface LoadingProps {
	width?: number;
	height?: number;
}

const Loading = (props: LoadingProps) => {
	return (
		<div className="flex items-center justify-center">
			<LazyLoadImage
				src={LoadingIcon}
				alt="Loading Icon"
				className="ml-1 mr-2 animate-spin"
				width={props.width ?? 35}
				height={props.height ?? 35}
				effect="opacity"
			/>
		</div>
	);
};

export default Loading;
