import classNames from 'classnames';
import { useContext, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link, useNavigate } from 'react-router-dom';
import requests from '../../../../api/requests';
import {
	FollowUserData,
	UserDataType,
} from '../../../../api/requests/users/getFollowData';
import LoadingIcon from '../../../../assets/icons/loading.svg';
import UserNoPicture from '../../../../assets/imgs/user.webp';
import BlockUserButton from '../../../../components/BlockUserButton';
import Button from '../../../../components/Button';
import FollowsDataModel from '../../../../components/FollowsDataModal';
import HTMLText from '../../../../components/HTMLText';
import Reveal from '../../../../components/Reveal';
import { UserContext } from '../../../../contextProviders/UserContext';
import { IUser } from '../../../../types/types';

interface UserProfileHeaderProps {
	user: IUser;
}

const UserProfileHeader: React.FC<UserProfileHeaderProps> = ({ user }) => {
	const navigate = useNavigate();

	const { loggedUser } = useContext(UserContext);

	const [loading, setLoading] = useState<boolean>(false);
	const [isUserBlocked, setIsUserBlocked] = useState<boolean>(user.blocked);
	const [isUserFollowing, setIsUserFollowing] = useState<boolean>(user.isFollowing);

	const [showModal, setShowModal] = useState<boolean>(false);
	const [selectedType, setSelectedType] = useState<UserDataType>('followers');
	const [followers, setFollowers] = useState<FollowUserData[]>([]);
	const [following, setFollowing] = useState<FollowUserData[]>([]);

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

	const handleDataUpdate = (newData: FollowUserData[]): void => {
		if (selectedType === 'followers') {
			setFollowers(newData);

			// Update the isFollowing property of the user in the following list (if it exists)
			setFollowing(prevData => {
				const newFollowing = prevData.map(userData => {
					if (userData.id === user.id) {
						return { ...userData, isFollowing: false };
					}

					return userData;
				});

				return newFollowing;
			});
		} else {
			setFollowing(newData);

			// Update the isFollowing property of the user in the followers list (if it exists)
			setFollowers(prevData => {
				const newFollowers = prevData.map(userData => {
					if (userData.id === user.id) {
						return { ...userData, isFollowing: false };
					}

					return userData;
				});

				return newFollowers;
			});
		}
	};

	return (
		<header>
			<Reveal width="100%" animation="slide-bottom" delay={0.05}>
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
							<h1 className="text-2xl sm:mr-1">
								{isUserBlocked ? (
									<s className="text-gray-600">{user.username}</s>
								) : (
									user.username
								)}
							</h1>
							{(user.isAdmin || isUserBlocked) && (
								<span
									className={classNames(
										'sm:px-2 sm:py-0.5 px-3 py-1 sm:text-xs text-sm rounded sm:mb-0 mb-4',
										{
											'text-white bg-gray-700 animate-pulse sm:mt-0 mt-2': user.isAdmin,
											'text-gray-700 border-gray-700 border-2 sm:mt-1': isUserBlocked,
										},
									)}
								>
									{user.isAdmin ? 'Admin' : 'Blocked'}
								</span>
							)}
						</div>
						<div className="flex flex-row">
							<button
								className="mr-3 text-gray-500 hover:underline"
								onClick={() => {
									setSelectedType('followers');
									setShowModal(true);
								}}
							>
								{user.followers} Followers
							</button>
							<button
								className="text-gray-500 hover:underline"
								onClick={() => {
									setSelectedType('following');
									setShowModal(true);
								}}
							>
								{user.following} Following
							</button>
						</div>
						<div className="flex flex-col items-center w-full mt-1 sm:flex-row">
							<p className="block w-full mb-6 text-center text-gray-500 sm:text-start sm:mb-0">
								Joined on{' '}
								{new Date(user.createdAt).toLocaleDateString(navigator.language, {
									day: 'numeric',
									month: 'long',
									year: 'numeric',
								})}
							</p>

							{loggedUser && (
								<Button
									type="button"
									id={
										loggedUser?.id === user.id ? 'edit-profile-button' : 'follow-button'
									}
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
									{loggedUser?.id === user.id ? (
										<Link to="/profile/edit" className="w-full">
											Edit Profile
										</Link>
									) : (
										<>{getButtonText()}</>
									)}
								</Button>
							)}

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
			</Reveal>

			<FollowsDataModel
				id={selectedType + '-list-modal'}
				type={selectedType}
				userId={user.id}
				show={showModal}
				data={selectedType === 'followers' ? followers : following}
				onDataUpdate={handleDataUpdate}
				onClose={() => setShowModal(false)}
			/>
		</header>
	);
};

export default UserProfileHeader;
