import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import requests from '../../api/requests';
import ErrorOccurred from '../../components/ErrorOccurred';
import Loading from '../../components/Loading';
import { IUser } from '../../types/types';
import UserProfileHeader from './components/UserProfileHeader';

const User: React.FC = () => {
	const { id } = useParams(); // Thought id
	const navigate = useNavigate();

	const [user, setUser] = useState<IUser>();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [errorOccurred, setErrorOccurred] = useState<boolean>(false);

	const fetchUser = useCallback(async (): Promise<void> => {
		if (!id) {
			navigate('/404');
			return;
		}

		try {
			const response = await requests.users.getUser(id === 'me' ? 'me' : parseInt(id));

			if (response.data.success) {
				setUser(response.data.data);
			} else if (response.status === 404) {
				navigate('/404');
			} else {
				throw new Error(response.data.message);
			}
		} catch (error) {
			console.log('An error occurred while fetching the user: ', error);
			setErrorOccurred(true);
		} finally {
			setIsLoading(false);
		}
	}, [id, navigate]);

	useEffect(() => {
		setIsLoading(true);
		fetchUser();
	}, [fetchUser]);

	return (
		<div className="flex flex-col items-center max-w-3xl mx-auto">
			<div className="w-full mt-14">
				{isLoading && <Loading />}
				{user && !isLoading && (
					<>
						<UserProfileHeader user={user} />
					</>
				)}
				{errorOccurred && (
					<ErrorOccurred text="An error occurred while fetching the user. Please try again later." />
				)}
			</div>
		</div>
	);
};

export default User;
