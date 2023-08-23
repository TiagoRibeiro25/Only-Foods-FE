import classNames from 'classnames';
import { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import requests from '../../api/requests';
import BlockIcon from '../../assets/icons/block.svg';
import LoadingIcon from '../../assets/icons/loading.svg';
import ConfirmActionModal from '../ConfirmActionModal';

type ButtonText = 'Block' | 'Blocking' | 'Unblock' | 'Unblocking';

interface BlockUserButtonProps {
	userId: number;
	username: string;
	isBlocked: boolean;
	className?: string;
	onStatusChange?: (newStatus: boolean) => void;
}

const BlockUserButton: React.FC<BlockUserButtonProps> = ({
	userId,
	username,
	isBlocked,
	className,
	onStatusChange,
}) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [showModal, setShowModal] = useState<boolean>(false);

	const getButtonText = (): ButtonText => {
		if (isBlocked) {
			return loading ? 'Unblocking' : 'Unblock';
		} else {
			return loading ? 'Blocking' : 'Block';
		}
	};

	const changeUserStatus = async (): Promise<void> => {
		setLoading(true);

		try {
			const response = await requests.users.handleBlockUser(userId);

			if (response.data.success && onStatusChange) {
				onStatusChange(!isBlocked);
			}
		} catch (error) {
			console.log("An error occurred while trying to change the user's status: ", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<div
				className={classNames(
					'flex flex-row items-center mt-4 sm:mt-0',
					loading ? 'cursor-default opacity-90' : 'cursor-pointer',
					className,
				)}
				onClick={() => setShowModal(true)}
			>
				<div className="flex items-center justify-center">
					<LazyLoadImage
						className={classNames('w-7 h-7 sm:mr-4 sm:ml-2', {
							'animate-spin': loading,
						})}
						src={loading ? LoadingIcon : BlockIcon}
						alt="Block User"
						effect="opacity"
					/>
				</div>

				<span className="ml-1 sm:hidden">{getButtonText()} User</span>
			</div>

			<ConfirmActionModal
				id="confirm-change-user-status-modal"
				message={`Are you sure you want to ${
					isBlocked ? 'unblock' : 'block'
				} ${username}?`}
				onConfirm={() => {
					setShowModal(false);
					changeUserStatus();
				}}
				onCancel={() => setShowModal(false)}
				show={showModal}
			/>
		</>
	);
};

export default BlockUserButton;
