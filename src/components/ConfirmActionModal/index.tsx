import Modal from '../Modal';

interface ConfirmActionModalProps {
	id: string;
	message: string;
	show: boolean;
	confirmText?: string;
	cancelText?: string;
	onConfirm: () => void;
	onCancel: () => void;
}

const ConfirmActionModal: React.FC<ConfirmActionModalProps> = ({
	id,
	message,
	show,
	confirmText,
	cancelText,
	onConfirm,
	onCancel,
}) => {
	return (
		<Modal id={id} show={show} onClose={onCancel}>
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
			<h3 className="mb-5 text-lg font-normal text-gray-500">{message}</h3>
			<button
				type="button"
				className="text-white bg-gray-900 hover:bg-gray-950 focus:ring-4 focus:outline-none focus:ring-gray-900 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
				onClick={() => {
					document.body.style.overflow = '';
					onConfirm();
				}}
			>
				{confirmText ?? "Yes, I'm sure"}
			</button>
			<button
				type="button"
				className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
				onClick={onCancel}
			>
				{cancelText ?? 'No, cancel'}
			</button>
		</Modal>
	);
};

export default ConfirmActionModal;
