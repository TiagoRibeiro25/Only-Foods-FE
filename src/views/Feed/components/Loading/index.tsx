import LoadingIcon from '../../../../assets/icons/loading.svg';

const Loading = () => {
	return (
		<div className="flex items-center justify-center">
			<img
				src={LoadingIcon}
				alt="Loading Icon"
				className="ml-1 mr-2 animate-spin"
				width={35}
				height={35}
			/>
		</div>
	);
};

export default Loading;
