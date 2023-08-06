import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ConfirmActionModalProps } from './types';

const ConfirmActionModal = (props: ConfirmActionModalProps) => {
	useEffect(() => {
		document.body.style.overflow = props.show ? 'hidden' : '';
	}, [props.show]);

	return (
		props.show &&
		ReactDOM.createPortal(
			<div
				id={props.id}
				tabIndex={-1}
				className={`fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50 ${
					props.show ? 'block' : 'hidden'
				}`}
			>
				<div className="relative bg-white rounded-lg shadow">
					<button
						type="button"
						className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
						onClick={props.onCancel}
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
					<div className="p-6 text-center">
						<svg
							className="w-12 h-12 mx-auto mb-4 text-gray-400"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 20 20"
						>
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
							/>
						</svg>
						<h3 className="mb-5 text-lg font-normal text-gray-500">{props.message}</h3>
						<button
							type="button"
							className="text-white bg-gray-900 hover:bg-gray-950 focus:ring-4 focus:outline-none focus:ring-gray-900 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
							onClick={props.onConfirm}
						>
							{props.confirmText ?? "Yes, I'm sure"}
						</button>

						<button
							type="button"
							className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
							onClick={props.onCancel}
						>
							{props.cancelText ?? 'No, cancel'}
						</button>
					</div>
				</div>
			</div>,
			document.body,
		)
	);
};

export default ConfirmActionModal;
