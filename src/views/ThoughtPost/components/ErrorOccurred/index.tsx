import { useNavigate } from 'react-router-dom';
import Button from '../../../../components/Button';
import Reveal from '../../../../components/Reveal';

const ErrorOccurred = () => {
	const navigate = useNavigate();
	const goBack = () => navigate(-1);

	return (
		<Reveal width="100%" animation="slide-bottom" delay={0.3} duration={0.7}>
			<div className="flex flex-col items-center justify-center gap-2 pt-8 pb-12 text-center col-span-full md:pb-6">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="#878d98"
					className="w-10 h-10"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
					/>
				</svg>

				<p className="mb-3 text-xl text-center text-gray-500">
					Something went wrong. Please try again later.
				</p>
				<Button
					type="button"
					id="go-back"
					className="py-2 text-white px-9 bg-zinc-800"
					onClick={goBack}
				>
					Go back
				</Button>
			</div>
		</Reveal>
	);
};

export default ErrorOccurred;
