export interface ConfirmActionModalProps {
	id: string;
	message: string;
	show: boolean;
	confirmText?: string;
	cancelText?: string;
	onConfirm: () => void;
	onCancel?: () => void;
}
