import classNames from 'classnames';
import { useContext, useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import requests from '../../api/requests';
import { FollowUserData, UserDataType } from '../../api/requests/users/getFollowData';
import SearchIcon from '../../assets/icons/search.svg';
import UserNoPicture from '../../assets/imgs/user.webp';
import { UserContext } from '../../contextProviders/UserContext';
import ErrorOccurred from '../ErrorOccurred';
import Input from '../Input';
import Loading from '../Loading';
import Modal from '../Modal';
import Reveal from '../Reveal';
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
	const [filter, setFilter] = useState<string>('');
	const [dataToDisplay, setDataToDisplay] = useState<FollowUserData[]>(data);

	const getErrorMessage = (): string => {
		if (type === 'followers') {
			return loggedUser?.id === userId
				? "You don't have any followers yet."
				: "This user doesn't have any followers yet.";
		} else {
			return loggedUser?.id === userId
				? "You aren't following anyone yet."
				: "This user isn't following anyone yet.";
		}
	};

	useEffect(() => {
		if (filter === '') {
			setDataToDisplay(data);
			return;
		}

		const newData = data.filter(user => {
			return user.username.toLowerCase().includes(filter.toLowerCase());
		});
		setDataToDisplay(newData);
	}, [data, filter]);

	useEffect(() => {
		// Clear the filter when modal is closed
		setFilter('');
	}, [show]);

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
					<div className="flex flex-col w-full mt-3 text-start">
						<div className="flex flex-row items-center">
							<LazyLoadImage
								className="w-5 h-5 mb-3 mr-3"
								src={SearchIcon}
								effect="opacity"
								alt="Search icon"
							/>

							<Input
								type="search"
								id="filter-follows"
								name="filter-follows"
								onChange={newValue => setFilter(newValue)}
								placeholder="Filter by username"
								value={filter}
							/>
						</div>

						<ul className="w-full divide-y divide-gray-200">
							{dataToDisplay.length > 0 ? (
								dataToDisplay.map(user => (
									<li key={user.id} className="flex flex-row">
										<div className="flex items-center w-full mt-6 mb-4">
											<div className="flex-shrink-0">
												<Link to={`/user/${user.id}`}>
													<LazyLoadImage
														className="object-cover object-center w-12 h-12 rounded-full sm:w-16 sm:h-16"
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
								))
							) : (
								<Reveal width="100%" animation="slide-bottom" delay={0.05}>
									<div className="flex items-center justify-center w-full h-full">
										<p className="my-3 text-sm font-bold text-gray-500">
											No users found with the given filter.
										</p>
									</div>
								</Reveal>
							)}
						</ul>
					</div>
				)}

				{!isLoading && !errorOccurred && data.length === 0 && (
					<div className="flex items-center justify-center w-full h-full">
						<p className="text-lg font-bold text-gray-800">{getErrorMessage()}</p>
					</div>
				)}
			</div>
		</Modal>
	);
};

export default FollowsDataModel;
