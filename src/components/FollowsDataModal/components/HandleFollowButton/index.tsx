import { useState } from 'react';
import requests from '../../../../api/requests';
import Button from '../../../Button';

interface HandleFollowButtonProps {
	userId: number;
	isFollowing: boolean;
	onFollowAction: (isFollowing: boolean) => void;
}

const HandleFollowButton: React.FC<HandleFollowButtonProps> = ({
	userId,
	isFollowing,
	onFollowAction,
}) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleFollow = async (): Promise<void> => {
		setIsLoading(true);

		try {
			const request = await requests.users.handleFollow(userId);

			if (request.data.success) {
				onFollowAction(!isFollowing);
			}
		} catch (error) {
			console.log('An error occurred while trying to follow/unfollow the user: ', error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Button
			type="button"
			className="sm:py-0.5 text-sm w-20 flex justify-center text-white bg-zinc-800"
			onClick={handleFollow}
			disabled={isLoading}
		>
			{isFollowing ? 'Unfollow' : 'Follow'}
		</Button>
	);
};

export default HandleFollowButton;
