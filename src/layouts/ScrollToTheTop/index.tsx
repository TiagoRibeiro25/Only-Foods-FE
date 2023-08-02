import { useEffect, useState } from 'react';

const ScrollToTheTop = () => {
	const [showButton, setShowButton] = useState(false);

	const handleScroll = () => setShowButton(window.scrollY > 700);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<>
			<button
				type="button"
				data-te-ripple-init
				data-te-ripple-color="light"
				className={`fixed p-3 text-xs font-medium leading-tight text-white uppercase bg-gray-900 rounded-full shadow-md bg-opacity-95 bottom-5 right-5 hover:bg-gray-950 hover:shadow-xl focus:bg-gray-950 focus:shadow-xl hover:scale-105 focus:outline-none focus:ring-0 active:bg-gray-950 active:shadow-xl ${
					showButton
						? 'transform translate-x-0 transition-transform duration-300 ease-in-out'
						: 'transform translate-x-20 transition-transform duration-300 ease-in-out'
				}`}
				id="btn-back-to-top"
				onClick={() => window.scrollTo(0, 0)}
			>
				<svg
					aria-hidden="true"
					focusable="false"
					data-prefix="fas"
					className="w-4 h-4"
					role="img"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 448 512"
				>
					<path
						fill="currentColor"
						d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"
					></path>
				</svg>
			</button>
		</>
	);
};

export default ScrollToTheTop;
