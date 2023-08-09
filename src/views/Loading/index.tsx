import { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Logo from '../../assets/logo/logo_color_2.png';
import LoadingComponent from '../../components/Loading';
import phrases from './phrases.json';
import { LoadingProps } from './types';

const Loading = (props: LoadingProps) => {
	const [currentPhrase, setCurrentPhrase] = useState(
		phrases[Math.floor(Math.random() * phrases.length)],
	);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentPhrase(phrases[Math.floor(Math.random() * phrases.length)]);
		}, 5000); // Change the phrase every 5 seconds

		return () => clearInterval(interval);
	}, []);

	return (
		<div>
			<div className="absolute z-10 flex items-center justify-center w-full h-full bg-white bg-opacity-60">
				<div className="flex flex-col items-center">
					<div className="flex flex-row">
						<LazyLoadImage
							src={Logo}
							alt="Only Foods Logo"
							width={52}
							height={32}
							effect="opacity"
						/>
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
								<LoadingComponent width={23} height={23} />
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
