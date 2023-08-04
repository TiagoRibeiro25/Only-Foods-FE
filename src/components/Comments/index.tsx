import { useCallback, useContext, useEffect, useState } from 'react';
import requests from '../../api/requests';
import { UserContext } from '../../contextProviders/UserContext';
import Loading from '../Loading';
import Reveal from '../Reveal';
import Comment from './components/Comment';
import NewCommentForm, { NewComment } from './components/NewCommentForm';

interface CommentsProps {
	type: 'thought' | 'recipe';
	id: number;
}

interface Comment extends NewComment {
	id: number;
}

const Comments = (props: CommentsProps) => {
	const { loggedUser } = useContext(UserContext);

	const [comments, setComments] = useState<Comment[]>([]);
	const [page, setPage] = useState<number>(1);
	const [reachedEnd, setReachedEnd] = useState<boolean>(false);
	const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [anErrorOccurred, setAnErrorOccurred] = useState<boolean>(false);

	const fetchMoreComments = useCallback(async () => {
		// Prevent making duplicate requests while loading or if reached the end
		if (isLoading || reachedEnd || anErrorOccurred) {
			return;
		}

		setIsLoading(true);

		try {
			const response = await requests.thoughts.getComments({
				id: props.id,
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
				}
			} else {
				// if the response was an 404 and there are comments in the list, then it reached the end
				if (response.status === 404 && comments.length > 0) {
					setReachedEnd(true);
				} else {
					setAnErrorOccurred(true);
				}
			}
		} catch (error) {
			console.log('Error fetching more comments:', error);
		} finally {
			setIsLoading(false);
		}
	}, [anErrorOccurred, comments, isLoading, page, props.id, reachedEnd]);

	const debounce = <T extends unknown[]>(func: (...args: T) => void, delay: number) => {
		let timer: ReturnType<typeof setTimeout>;
		return (...args: T) => {
			clearTimeout(timer);
			timer = setTimeout(() => func(...args), delay);
		};
	};

	// Create a debounced version of the fetchMoreComments function using debounce
	const debouncedFetchMoreComments = useCallback(debounce(fetchMoreComments, 500), [
		fetchMoreComments,
	]);

	const handleNewComment = (newComment: NewComment): void => {
		const comment: Comment = {
			id: comments.length > 1 ? comments[comments.length - 1].id + 1 : 1,
			...newComment,
		};

		setComments(prevComments => [...prevComments, comment]);
	};

	// Attach scroll event listener to load more comments when the user reaches the bottom of the page
	useEffect(() => {
		// Fetch initial comments on the first render
		if (isInitialLoad) {
			fetchMoreComments();
			setIsInitialLoad(false);
		}

		const handleScroll = () => {
			// When the user scrolls to the bottom (minus 200px), load more comments
			if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
				debouncedFetchMoreComments();
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll);
	}, [debouncedFetchMoreComments, fetchMoreComments, isInitialLoad]);

	return (
		<section className="flex flex-col w-full">
			{loggedUser && (
				<Reveal width="100%" animation="slide-top" delay={0.05}>
					<NewCommentForm type={props.type} id={props.id} onSubmit={handleNewComment} />
				</Reveal>
			)}

			<div className="w-full mt-14">
				{comments.map(comment => (
					<Reveal key={comment.id} width="100%" animation="slide-right" delay={0.05}>
						<Comment {...comment} />
					</Reveal>
				))}
				{isLoading && <Loading />}
				{reachedEnd && <p>Reached End</p>}
				{anErrorOccurred && comments.length !== 0 && <p>An error occurred</p>}
				{!isLoading && comments.length === 0 && <p>No comments</p>}
			</div>
		</section>
	);
};

export default Comments;
