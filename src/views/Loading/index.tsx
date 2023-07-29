import { useEffect, useState } from 'react';
import LoadingIcon from '../../assets/icons/loading.svg';
import Logo from '../../assets/logo/logo_color_2.png';
import phrases from './phrases';

interface LoadingProps {
	state: 'loading' | 'error';
}

const Loading = (props: LoadingProps) => {
	const [currentPhrase, setCurrentPhrase] = useState(
		phrases[Math.floor(Math.random() * phrases.length)],
	);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentPhrase(phrases[Math.floor(Math.random() * phrases.length)]);
		}, 5000); // Change the phrase 5 seconds

		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<div>
			<div className="absolute z-10 flex items-center justify-center w-full h-full bg-white bg-opacity-60">
				<div className="flex flex-col items-center">
					<div className="flex flex-row">
						<img src={Logo} alt="Only Foods Logo" width={52} height={32} />
						<span className="self-center mt-3 text-4xl font-semibold select-none font-bellefair whitespace-nowrap">
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
						<>
							<div className="flex flex-row my-4">
								<span className="mx-4 text-2xl select-none font-bellefair">Loading</span>
								<div className="flex items-center">
									<img
										src={LoadingIcon}
										alt="Loading Icon"
										className="ml-1 mr-2 animate-spin"
										width={23}
										height={23}
									/>
								</div>
							</div>
							<span className="text-xl font-bellefair">{currentPhrase}</span>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Loading;
