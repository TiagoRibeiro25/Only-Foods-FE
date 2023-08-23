import classNames from 'classnames';
import { useContext, useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import requests from '../../api/requests';
import { FollowUserData, UserDataType } from '../../api/requests/users/getFollowData';
import UserNoPicture from '../../assets/imgs/user.webp';
import { UserContext } from '../../contextProviders/UserContext';
import ErrorOccurred from '../ErrorOccurred';
import Loading from '../Loading';
import Modal from '../Modal';
import HandleFollowButton from './components/HandleFollowButton';

interface FollowsDataModelProps {
	id: string;
	type: UserDataType;
	userId: number;
	show: boolean;
	data: FollowUserData[];
	onDataUpdate: (newData: FollowUserData[]) => void;
	onClose: () => void;
}

const FollowsDataModel: React.FC<FollowsDataModelProps> = ({
	id,
	type,
	userId,
	show,
	data,
	onDataUpdate,
	onClose,
}) => {
	const { loggedUser } = useContext(UserContext);

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [errorOccurred, setErrorOccurred] = useState<boolean>(false);

	useEffect(() => {
		if (!show || data.length > 0) {
			return;
		}

		const fetchData = async (): Promise<void> => {
			setIsLoading(true);
			setErrorOccurred(false);

			try {
				let response;
				if (type === 'followers') {
					response = await requests.users.getFollowers(userId);
				} else {
					response = await requests.users.getFollowing(userId);
				}

				if (response.data.success && response.data.data) {
					onDataUpdate(response.data.data);
				}
			} catch (error) {
				console.log(`An error occurred while trying to fetch the ${type}: ${error}`);
				setErrorOccurred(true);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, [data.length, onDataUpdate, show, type, userId]);

	return (
		<Modal id={id} show={show} onClose={onClose}>
			<div className="sm:w-96 w-[250px] min-h-[100px] flex items-center">
				{isLoading && <Loading />}

				{!isLoading && errorOccurred && (
					<ErrorOccurred
						text={`An error occurred while trying to fetch the ${type}. Please try again later.`}
					/>
				)}

				{!isLoading && !errorOccurred && data.length > 0 && (
					<ul className="w-full mt-4 divide-y divide-gray-200">
						{data.map(user => (
							<li key={user.id} className="flex flex-row">
								<div className="flex items-center w-full mt-6 mb-4">
									<div className="flex-shrink-0">
										<Link to={`/user/${user.id}`}>
											<LazyLoadImage
												className="w-12 h-12 rounded-full sm:w-16 sm:h-16"
												src={user.userImage?.cloudinaryImage ?? UserNoPicture}
												effect="blur"
												placeholderSrc={UserNoPicture}
												alt={user.username + ' profile picture'}
											/>
										</Link>
									</div>
									<div className="flex flex-col w-full h-full sm:flex-row">
										<div
											className={classNames('flex items-center mx-4 sm:h-full', {
												'h-full': loggedUser?.id === user.id,
											})}
										>
											<Link to={`/user/${user.id}`} className="hover:underline">
												<p className="text-base text-gray-900 truncate">
													{user.username}{' '}
													{user.id === loggedUser?.id && (
														<span className="text-xs text-gray-500">(You)</span>
													)}
												</p>
											</Link>
										</div>
										<div className="flex items-center w-full mx-4 mt-1 sm:justify-end sm:mx-0 sm:mt-0">
											{loggedUser?.id !== user.id && (
												<HandleFollowButton
													userId={user.id}
													isFollowing={user.isFollowing}
													onFollowAction={(isFollowing: boolean) => {
														const newData = data.map(userData => {
															if (userData.id === user.id) {
																return { ...userData, isFollowing };
															}

															return userData;
														});

														onDataUpdate(newData);
													}}
												/>
											)}
										</div>
									</div>
								</div>
							</li>
						))}
					</ul>
				)}

				{!isLoading && !errorOccurred && data.length === 0 && (
					<div className="flex flex-col items-center justify-center w-full h-full">
						<p className="text-lg font-bold text-gray-800">
							{type === 'followers'
								? "This user doesn't have any followers yet."
								: "This user isn't following anyone yet."}
						</p>
					</div>
				)}
			</div>
		</Modal>
	);
};

export default FollowsDataModel;
