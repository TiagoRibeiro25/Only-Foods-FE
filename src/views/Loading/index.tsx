import Logo from '../../assets/logo/logo_color_2.png';

interface LoadingProps {
	state: 'loading' | 'error';
}

const Loading = (props: LoadingProps) => {
	return (
		<div>
			<div className="absolute z-10 flex items-center justify-center w-full h-full bg-white bg-opacity-60">
				<div className="flex flex-col items-center">
					<div className="flex flex-row">
						<img src={Logo} alt="Only Foods Logo" width={42} height={32} />
						<span className="self-center mt-1 text-4xl font-semibold select-none font-bellefair whitespace-nowrap">
							Only Foods
						</span>
					</div>
					{props.state === 'error' ? (
						<div className="flex flex-row mx-6 mt-2">
							<span className="text-2xl text-center font-bellefair">
								Woops! Looks like we're having problems on our end.
								<br />
								Please try again later.
							</span>
						</div>
					) : (
						<div className="flex flex-row mt-2">
							<span className="mr-4 text-2xl select-none font-bellefair">Loading</span>
							<div className="flex items-center">
								<svg
									className="w-6 h-6 text-gray-800 animate-spin"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
								>
									<circle
										className="opacity-25"
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										strokeWidth="4"
									></circle>
									<path
										className="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
									></path>
								</svg>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Loading;
