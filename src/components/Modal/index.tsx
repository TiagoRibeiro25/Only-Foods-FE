import classNames from 'classnames';
import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import Reveal from '../Reveal';

interface ModalProps {
	id: string;
	show: boolean;
	children: React.ReactNode;
	onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ id, show, children, onClose }) => {
	const modalRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		document.body.style.overflow = show ? 'hidden' : '';

		const handleOutsideClick = (event: MouseEvent) => {
			if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
				onClose();
			}
		};

		if (show) {
			document.addEventListener('mousedown', handleOutsideClick);
		} else {
			document.removeEventListener('mousedown', handleOutsideClick);
		}

		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [show, onClose]);

	return (
		show &&
		ReactDOM.createPortal(
			<div
				id={id}
				tabIndex={-1}
				className={classNames(
					'fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50 px-3',
					show ? 'block' : 'hidden',
				)}
			>
				<Reveal animation="fade" delay={0.05} duration={0.4}>
					<div ref={modalRef} className="relative bg-white rounded-lg shadow">
						<button
							type="button"
							className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
							onClick={onClose}
						>
							<svg
								className="w-3 h-3"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 14 14"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
								/>
							</svg>
							<span className="sr-only">Close modal</span>
						</button>
						<div className="p-6 text-center">{children}</div>
					</div>
				</Reveal>
			</div>,
			document.body,
		)
	);
};

export default Modal;
