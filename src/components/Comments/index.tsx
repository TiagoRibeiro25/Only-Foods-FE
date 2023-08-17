import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import requests from '../../api/requests';
import { UserContext } from '../../contextProviders/UserContext';
import { IComment, ItemType } from '../../types/types';
import ErrorOccurred from '../ErrorOccurred';
import Loading from '../Loading';
import NoItemsFound from '../NoItemsFound';
import ReachedEnd from '../ReachedEnd';
import Reveal from '../Reveal';
import Comment from './components/Comment';
import NewCommentForm from './components/NewCommentForm';

export interface CommentsProps {
	type: ItemType;
	id: number;
}

const Comments: React.FC<CommentsProps> = ({ type, id }) => {
	const { loggedUser } = useContext(UserContext);

	const [comments, setComments] = useState<IComment[]>([]);
	const [page, setPage] = useState<number>(1);
	const [reachedEnd, setReachedEnd] = useState<boolean>(false);
	const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [anErrorOccurred, setAnErrorOccurred] = useState<boolean>(false);

	const loadingRef = useRef<boolean>(false);
	const anErrorOccurredRef = useRef<boolean>(false);
	const reachedEndRef = useRef<boolean>(false);

	const fetchMoreComments = useCallback(async () => {
		// Prevent making duplicate requests while loading or if reached the end
		if (loadingRef.current || reachedEndRef.current || anErrorOccurredRef.current) {
			return;
		}

		loadingRef.current = true;
		setIsLoading(true);

		try {
			const itemType = type === 'thought' ? 'thoughts' : 'recipes';

			const response = await requests[itemType].getComments({
				id: id,
				page,
				limit: 5,
			});

			if (response.data.success) {
				const newComments = response.data.data?.comments ?? [];

				// Check if there are duplicate comments
				const duplicateComments = newComments.filter(newComment =>
					comments.some(comment => comment.id === newComment.id),
				);

				// Remove the duplicate comments from the new comments
				const filteredNewComments = newComments.filter(
					newComment => !duplicateComments.includes(newComment),
				);

				const totalComments = [...comments, ...filteredNewComments];

				setComments(totalComments);
				setPage(page + 1);

				// Check if reached the end of comments to disable further loading
				if (response.data.data?.totalCount === totalComments.length) {
					setReachedEnd(true);
					reachedEndRef.current = true;
				}
			} else {
				// if the response was an 404 and there are comments in the list, then it reached the end
				if (response.status === 404 && comments.length > 0) {
					setReachedEnd(true);
					reachedEndRef.current = true;
				} else {
					setAnErrorOccurred(true);
					anErrorOccurredRef.current = true;
				}
			}
		} catch (error) {
			console.log('Error fetching more comments:', error);
			setAnErrorOccurred(true);
			anErrorOccurredRef.current = true;
		} finally {
			setIsLoading(false);
			loadingRef.current = false;
		}
	}, [type, id, page, comments]);

	// Attach scroll event listener to load more comments when the user reaches the bottom of the page
	useEffect(() => {
		// Fetch initial comments on the first render
		if (isInitialLoad) {
			fetchMoreComments();
			setIsInitialLoad(false);
			return;
		}

		const handleScroll = () => {
			// When the user scrolls to the bottom (minus 200px), load more comments
			if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
				fetchMoreComments();
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll);
	}, [comments.length, fetchMoreComments, isInitialLoad]);

	return (
		<section className="flex flex-col w-full">
			{loggedUser && !loggedUser.isBlocked && (
				<Reveal width="100%" animation="slide-top" delay={0.05}>
					<NewCommentForm
						type={type}
						id={id}
						onSubmit={newComment => {
							setComments(prevComments => [newComment, ...prevComments]);
						}}
					/>
				</Reveal>
			)}

			<div className="w-full mt-14">
				{comments.map(comment => (
					<Reveal key={comment.id} width="100%" animation="slide-right" delay={0.05}>
						<Comment {...comment} />
					</Reveal>
				))}
				{isLoading && <Loading />}
				{reachedEnd && <ReachedEnd />}
				{anErrorOccurred && comments.length !== 0 && (
					<ErrorOccurred text="An error occurred while fetching comments." />
				)}
				{!isLoading && comments.length === 0 && (
					<NoItemsFound
						warning={`This ${type} has no comments yet.`}
						message={loggedUser ? 'Be the one who starts the conversation.' : ''}
					/>
				)}
			</div>
		</section>
	);
};

export default Comments;
