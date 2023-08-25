import { useEffect, useState } from 'react';
import requests from '../../api/requests';
import UserNoPicture from '../../assets/imgs/user.webp';
import ErrorOccurred from '../../components/ErrorOccurred';
import Loading from '../../components/Loading';
import Reveal from '../../components/Reveal';
import { IUser } from '../../types/types';
import AccountInfo from './components/AccountInfo';
import ChangePassword from './components/ChangePassword';
import NameAndDescription from './components/NameAndDescription';
import UserPicture from './components/UserPicture';

type ExcludedUserProperties =
	| 'followers'
	| 'following'
	| 'isLoggedUser'
	| 'isFollowing'
	| 'createdAt';

export interface User extends Omit<IUser, ExcludedUserProperties> {}

const ProfileEdit: React.FC = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [errorOccurred, setErrorOccurred] = useState<boolean>(false);
	const [user, setUser] = useState<User>({} as User);

	useEffect(() => {
		setIsLoading(true);

		const fetchUserData = async (): Promise<void> => {
			try {
				const response = await requests.users.getLoggedUser();

				if (response.data.success && response.data.data) {
					setUser({
						id: response.data.data.id,
						username: response.data.data.username,
						email: response.data.data.email,
						userImage: response.data.data.userImage,
						description: response.data.data.description ?? '',
						blocked: response.data.data.blocked,
						isAdmin: response.data.data.isAdmin,
						resetPasswordToken: response.data.data.resetPasswordToken,
					});
				} else {
					throw new Error(response.data.message);
				}
			} catch (error) {
				console.log("An error occurred while trying to fetch the user's data: ", error);
				setErrorOccurred(true);
			} finally {
				setIsLoading(false);
			}
		};

		fetchUserData();
	}, []);

	return (
		<div className="flex flex-col items-center justify-center max-w-3xl mx-auto">
			<Reveal width="100%" animation="slide-right" delay={0.05}>
				<h1 className="w-full my-3 text-3xl font-bellefair">Edit Profile</h1>
			</Reveal>

			{isLoading && (
				<div className="h-[50vh] flex justify-center items-center">
					<Reveal width="100%" animation="slide-bottom" delay={0.1}>
						<Loading />
					</Reveal>
				</div>
			)}

			{!isLoading && errorOccurred && (
				<div className="h-[50vh] flex justify-center items-center">
					<ErrorOccurred text="An error occurred while trying to fetch the user data." />
				</div>
			)}

			{!isLoading && !errorOccurred && Object.keys(user).length > 0 && (
				<div className="w-full mt-6 mb-12">
					<Reveal width="100%" animation="slide-bottom" delay={0.05}>
						<AccountInfo id={user.id} email={user.email ?? ''} />
					</Reveal>

					<Reveal width="100%" animation="fade" delay={0.3}>
						<hr className="h-px mb-10 bg-gray-200 border-0" />
					</Reveal>

					<UserPicture userImage={user.userImage?.cloudinaryImage ?? UserNoPicture} />

					<Reveal width="100%" animation="fade" delay={0.3}>
						<hr className="h-px my-12 mb-10 bg-gray-200 border-0" />
					</Reveal>

					<NameAndDescription username={user.username} description={user.description} />

					<Reveal width="100%" animation="fade" delay={0.3}>
						<hr className="h-px my-6 mb-10 bg-gray-200 border-0" />
					</Reveal>

					{user.resetPasswordToken && (
						<ChangePassword resetPasswordToken={user.resetPasswordToken} />
					)}
				</div>
			)}
		</div>
	);
};

export default ProfileEdit;
