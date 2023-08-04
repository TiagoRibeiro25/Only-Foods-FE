import { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import requests from '../../api/requests';
import Loading from '../../components/Loading';
import Reveal from '../../components/Reveal';
import Thought from '../../components/Thought';
import { ThoughtsContext } from '../../contextProviders/ThoughtsContext';
import { UserContext } from '../../contextProviders/UserContext';
import ErrorOccurred from './components/ErrorOccurred';

interface Thought {
	id: number;
	content: string;
	edited: boolean;
	author: {
		id: number;
		username: string;
		userImage?: {
			cloudinaryImage: string;
		};
	};
	likes: number;
	comments: number;
	isAuthor: boolean;
	isLiked: boolean;
	createdAgo: string;
	createdAt: string;
}

const ThoughtPost = () => {
	const { id } = useParams(); // Thought id
	const navigate = useNavigate();
	const { loggedUser } = useContext(UserContext);
	const thoughtsContext = useContext(ThoughtsContext);

	const [thought, setThought] = useState<Thought>();
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
							onDelete={() => {
								thoughtsContext.resetAllState();
								navigate('/feed');
							}}
							onEdit={(id: number, content: string) => {
								thoughtsContext.resetAllState();
								setThought({ ...thought, id, content, edited: true });
							}}
							onLikeUpdate={(id: number, newLikes: number, isLiked: boolean) => {
								thoughtsContext.resetAllState();
								setThought({ ...thought, id, likes: newLikes, isLiked });
							}}
						/>
					</Reveal>
				)}
				{errorOccurred && <ErrorOccurred />}
			</div>

			{/* Comments */}
			<div className="flex justify-center w-full">{}</div>
		</div>
	);
};

export default ThoughtPost;
