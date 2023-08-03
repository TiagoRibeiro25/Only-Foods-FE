import { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import requests from '../../api/requests';
import CommentIcon from '../../assets/icons/comment.svg';
import CopiedIcon from '../../assets/icons/copied.svg';
import CopyIcon from '../../assets/icons/copy.svg';
import LikeIcon from '../../assets/icons/like.svg';
import LikedIcon from '../../assets/icons/liked.svg';
import LoadingIcon from '../../assets/icons/loading.svg';
import formatData from '../../utils/formatData';
import Reveal from '../Reveal';

interface PostUserActionsProps {
	type: 'thought' | 'recipe';
	id: number;
	likes: number;
	comments: number;
	isAuthor: boolean;
	isLiked: boolean;
	onLikeUpdate: (id: number, newLikes: number, isLiked: boolean) => void;
}

const PostUserActions = (props: PostUserActionsProps) => {
	const [isCopied, setIsCopied] = useState<boolean>(false);
	const [isLiked, setIsLiked] = useState<boolean>(props.isLiked);
	const [liking, setLiking] = useState<boolean>(false);
	const [likeIcon, setLikeIcon] = useState<string>(LikeIcon);

	const handleLike = async (): Promise<void> => {
		if (liking) return;

		setLiking(true);

		try {
			const response = await requests.thoughts.handleLike(props.id);

			if (response.data.success) {
				const newLikeStatus: boolean = !isLiked;
				setIsLiked(newLikeStatus);

				// Update the number of likes in the thoughts state
				const newLikes: number = isLiked ? props.likes - 1 : props.likes + 1;
				props.onLikeUpdate(props.id, newLikes, newLikeStatus);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLiking(false);
		}
	};

	const handleCopy = (): void => {
		setIsCopied(true);
		navigator.clipboard.writeText(`${window.location.origin}/${props.type}/${props.id}`);

		setTimeout(() => {
			setIsCopied(false);
		}, 3000);
	};

	useEffect(() => {
		if (liking) {
			setLikeIcon(LoadingIcon);
		} else {
			setLikeIcon(isLiked ? LikedIcon : LikeIcon);
		}
	}, [isLiked, liking]);

	return (
		<>
			{/* Copy Link */}
			<div className="flex items-center">
				{isCopied ? (
					<Reveal width="fit-content" animation="fade" delay={0} duration={0.7}>
						<div className="flex items-center justify-center">
							<LazyLoadImage
								src={CopiedIcon}
								alt={'Copy' + props.type + 'Link'}
								effect="opacity"
								className="cursor-pointer hover:opacity-80"
								width={20}
							/>
						</div>
					</Reveal>
				) : (
					<LazyLoadImage
						src={CopyIcon}
						alt={'Copy' + props.type + 'Link'}
						effect="opacity"
						className="cursor-pointer hover:opacity-80"
						width={20}
						onClick={handleCopy}
					/>
				)}
			</div>

			{/* Likes */}
			<div className="flex items-center">
				<LazyLoadImage
					src={likeIcon}
					alt={'Like' + props.type}
					effect="opacity"
					className={`cursor-pointer hover:opacity-80 ${liking ? 'animate-spin' : ''}`}
					width={22}
					onClick={handleLike}
				/>

				{/* Like Count */}
				<span className="ml-1 text-sm font-semibold">
					{formatData.likes(props.likes)}
				</span>
			</div>

			{/* Comments */}
			<div className="flex items-center">
				<Link to={`/${props.type}/${props.id}`} className="flex items-center">
					<LazyLoadImage
						src={CommentIcon}
						alt="See Comments"
						effect="opacity"
						className="cursor-pointer hover:opacity-80"
						width={22}
					/>
				</Link>

				{/* Comment Count */}
				<span className="ml-1 text-sm font-semibold">
					{formatData.comments(props.comments)}
				</span>
			</div>
		</>
	);
};

export default PostUserActions;
