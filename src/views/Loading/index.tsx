import { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Logo from '../../assets/logo/logo_color_2.webp';
import LoadingComponent from '../../components/Loading';
import phrases from './phrases.json';

interface LoadingProps {
	state: 'loading' | 'error';
}

const Loading: React.FC<LoadingProps> = ({ state }) => {
	const [currentPhrase, setCurrentPhrase] = useState<string>(
		phrases[Math.floor(Math.random() * phrases.length)],
	);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentPhrase(phrases[Math.floor(Math.random() * phrases.length)]);
		}, 5000); // Change the phrase every 5 seconds

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="absolute z-10 flex items-center justify-center w-full h-full">
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
				{state === 'error' ? (
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
							<span className="text-2xl select-none font-bellefair">Loading</span>
							<LoadingComponent width={23} height={23} />
						</div>
						<span className="mx-4 text-xl text-center font-bellefair">
							{currentPhrase}
						</span>

						<div className="absolute bottom-3">
							<span className="mx-4 text-lg text-center font-bellefair opacity-90">
								This shouldn't take more than 40 seconds
							</span>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Loading;
