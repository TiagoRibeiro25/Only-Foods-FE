import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../../components/Button';

const ScrollToTheTopIcon: React.FC = () => {
	const location = useLocation();

	const [showButton, setShowButton] = useState<boolean>(false);

	const handleClick = () => {
		window.scrollTo(0, 0);

		// remove any hash from the url (e.g. /recipes/1#comment-1 -> /recipes/1)
		window.history.replaceState({}, '', location.pathname + location.search);

		// update hash in react-router-dom
		location.hash = '';
	};

	const handleScroll = () => setShowButton(window.scrollY > 700);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<Button
			type="button"
			id="scroll-to-the-top-button"
			className={classNames(
				'z-20 fixed p-3 text-xs font-medium text-white bg-zinc-800 bg-opacity-90 bottom-5 right-5 hover:bg-zinc-950 hover:shadow-xl focus:bg-zinc-950 focus:shadow-xl focus:outline-none focus:ring-0 active:bg-zinc-950 active:shadow-xl',
				showButton ? 'translate-x-0' : 'translate-x-20',
			)}
			onClick={handleClick}
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
		</Button>
	);
};

export default ScrollToTheTopIcon;
