import classNames from 'classnames';
import { useContext, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate } from 'react-router-dom';
import requests from '../../../../api/requests';
import LoadingIcon from '../../../../assets/icons/loading.svg';
import UserNoPicture from '../../../../assets/imgs/user.webp';
import BlockUserButton from '../../../../components/BlockUserButton';
import Button from '../../../../components/Button';
import HTMLText from '../../../../components/HTMLText';
import { UserContext } from '../../../../contextProviders/UserContext';
import { IUser } from '../../../../types/types';
import ProfileUsername from './components/ProfileUsername';
import UserJoinedDate from './components/UserJoinedDate';

interface UserProfileHeaderProps {
	user: IUser;
}

const UserProfileHeader: React.FC<UserProfileHeaderProps> = ({ user }) => {
	const navigate = useNavigate();

	const { loggedUser } = useContext(UserContext);

	const [loading, setLoading] = useState<boolean>(false);
	const [isUserBlocked, setIsUserBlocked] = useState<boolean>(user.blocked);
	const [isUserFollowing, setIsUserFollowing] = useState<boolean>(user.isFollowing);

	const getButtonText = (): string => {
		if (loggedUser?.id === user.id) return 'Edit Profile';
		if (isUserFollowing) return loading ? 'Unfollowing' : 'Unfollow';
		return loading ? 'Following' : 'Follow';
	};

	const handleButtonClick = async (): Promise<void> => {
		if (loggedUser?.id === user.id) {
			navigate('/profile/edit');
			return;
		}

		setLoading(true);

		try {
			const response = await requests.users.handleFollow(user.id);
			if (response.data.success) {
				setIsUserFollowing(!isUserFollowing);
			}
		} catch (error) {
			console.log('An error occurred while trying to follow/unfollow the user: ', error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<header>
			<div className="flex flex-col items-center sm:items-start sm:flex-row">
				<div className="sm:mr-10">
					<LazyLoadImage
						className="w-40 h-40 rounded-full sm:w-36 sm:h-36"
						src={user.userImage?.cloudinaryImage ?? UserNoPicture}
						alt="User Profile Picture"
						placeholderSrc={UserNoPicture}
						effect="blur"
					/>
				</div>
				<div className="flex flex-col items-center flex-grow sm:items-start">
					<div className="flex flex-col items-center sm:flex-row">
						<ProfileUsername
							username={user.username}
							isAdmin={user.isAdmin}
							isBlocked={isUserBlocked}
						/>
					</div>
					<div className="flex flex-row">
						<span className="mr-3 text-gray-500">{user.followers} Followers</span>
						<span className="text-gray-500 ">{user.following} Following</span>
					</div>
					<div className="flex flex-col items-center w-full mt-1 sm:flex-row">
						<p className="block w-full mb-6 text-gray-500 sm:mb-0">
							<UserJoinedDate joinedAt={user.createdAt} />
						</p>
						<Button
							type="button"
							id={loggedUser?.id === user.id ? 'edit-profile-button' : 'follow-button'}
							className={classNames(
								'text-white bg-zinc-800 py-1.5 sm:mt-0 sm:ml-auto whitespace-nowrap',
								loading ? 'px-6' : 'px-10',
							)}
							icon={loading ? LoadingIcon : ''}
							iconAlt="Loading Icon"
							iconAnimation="spin"
							disabled={loading}
							onClick={handleButtonClick}
						>
							{getButtonText()}
						</Button>

						{loggedUser?.isAdmin && !user.isAdmin && (
							<BlockUserButton
								className="mt-6 sm:mt-0 sm:ml-auto"
								userId={user.id}
								username={user.username}
								isBlocked={isUserBlocked}
								onStatusChange={(newStatus: boolean) => setIsUserBlocked(newStatus)}
							/>
						)}
					</div>
				</div>
			</div>

			{user.description?.trim().length > 0 && (
				<div id="description" className="mt-6 text-center sm:text-left">
					<HTMLText text={user.description} className="text-gray-500 " />
				</div>
			)}

			<hr className="h-px my-8 bg-gray-200 border-0 " />
		</header>
	);
};

export default UserProfileHeader;
