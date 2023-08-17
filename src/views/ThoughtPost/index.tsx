import { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import requests from '../../api/requests';
import Comments from '../../components/Comments';
import Loading from '../../components/Loading';
import Reveal from '../../components/Reveal';
import Thought from '../../components/Thought';
import { UserContext } from '../../contextProviders/UserContext';
import { IThought } from '../../types/types';
import ErrorOccurred from './components/ErrorOccurred';

const ThoughtPost: React.FC = () => {
	const { id } = useParams(); // Thought id
	const navigate = useNavigate();
	const { loggedUser } = useContext(UserContext);

	const [thought, setThought] = useState<IThought>();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [errorOccurred, setErrorOccurred] = useState<boolean>(false);

	const fetchThought = useCallback(async () => {
		try {
			const response = await requests.thoughts.getThought(id ? +id : 0);

			if (response.data.success && response.data.data) {
				const thoughtData = {
					...response.data.data,
					isLiked: response.data.data?.isLiked ?? false,
					isAuthor: response.data.data?.isAuthor ?? false,
				};

				setThought(thoughtData);
			} else {
				// If the thought doesn't exist, redirect to 404 page
				navigate('/404');
			}
		} catch (error) {
			console.log(error);
			setErrorOccurred(true);
		} finally {
			setIsLoading(false);
		}
	}, [id, navigate]);

	useEffect(() => {
		setIsLoading(true);
		fetchThought();
	}, [fetchThought]);

	return (
		<div className="flex flex-col items-center max-w-3xl mx-auto mt-28">
			{/* Thought */}
			<div className="w-full mt-14">
				{isLoading && <Loading />}
				{thought && !isLoading && (
					<Reveal width="100%" animation="slide-right" delay={0.05}>
						<Thought
							isAdmin={loggedUser?.isAdmin ?? false}
							isBlocked={loggedUser?.isBlocked ?? false}
							thought={thought}
						/>
					</Reveal>
				)}
				{errorOccurred && <ErrorOccurred />}
			</div>

			{/* Line separating the thought and the comments */}
			{!loggedUser && thought && <div className="w-full border-t border-gray-200"></div>}

			{/* Comments */}
			{!isLoading && thought && <Comments type="thought" id={thought.id ?? 0} />}
		</div>
	);
};

export default ThoughtPost;
