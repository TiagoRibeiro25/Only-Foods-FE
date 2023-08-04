import { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import requests from '../../api/requests';
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import Post from '../../components/Post';
import Reveal from '../../components/Reveal';
import { ThoughtsContext } from '../../contextProviders/ThoughtsContext';
import { UserContext } from '../../contextProviders/UserContext';

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
	const [isLoading, setIsLoading] = useState(true);

	const goBack = () => {
		navigate(-1);
	};

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
				{thought && !isLoading ? (
					<Reveal width="100%" animation="slide-right" delay={0.05}>
						<Post
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
				) : (
					<div className="flex flex-col justify-center h-96">
						<Reveal width="100%" animation="slide-bottom" delay={0.3} duration={0.7}>
							<div className="flex flex-col items-center justify-center gap-2 pt-8 pb-12 text-center col-span-full md:pb-6">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="#878d98"
									className="w-10 h-10"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
									/>
								</svg>

								<p className="mb-3 text-xl text-center text-gray-500">
									Something went wrong. Please try again later.
								</p>
								<Button type="button" padding="0.5rem 2rem" onClick={goBack}>
									Go back
								</Button>
							</div>
						</Reveal>
					</div>
				)}
			</div>

			{/* Comments */}
			<div className="flex justify-center w-full">{}</div>
		</div>
	);
};

export default ThoughtPost;
