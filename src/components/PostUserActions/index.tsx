import classNames from 'classnames';
import { useContext, useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import requests from '../../api/requests';
import CommentIcon from '../../assets/icons/comment.svg';
import CopiedIcon from '../../assets/icons/copied.svg';
import CopyIcon from '../../assets/icons/copy.svg';
import LikeIcon from '../../assets/icons/like.svg';
import LikedIcon from '../../assets/icons/liked.svg';
import LoadingIcon from '../../assets/icons/loading.svg';
import { UserContext } from '../../contextProviders/UserContext';
import { ItemType } from '../../types/types';
import formatData from '../../utils/formatData';
import Reveal from '../Reveal';

interface PostUserActionsProps {
	type: ItemType;
	id: number;
	likes: number;
	comments: number;
	isLiked: boolean;
	onLikeUpdate: (id: number, newLikes: number, isLiked: boolean) => void;
}

const PostUserActions: React.FC<PostUserActionsProps> = ({
	type,
	id,
	likes,
	comments,
	isLiked,
	onLikeUpdate,
}) => {
	const { loggedUser } = useContext(UserContext);

	const [isCopied, setIsCopied] = useState<boolean>(false);
	const [isItemLiked, setIsItemLiked] = useState<boolean>(isLiked);
	const [liking, setLiking] = useState<boolean>(false);
	const [likeIcon, setLikeIcon] = useState<string>(LikeIcon);

	const handleLike = async (): Promise<void> => {
		// If the user is not logged in or the like request is being processed, return
		if (!loggedUser || loggedUser.isBlocked || liking) {
			return;
		}

		setLiking(true);
		const itemType = type === 'thought' ? 'thoughts' : 'recipes';

		try {
			const response = await requests[itemType].handleLike(id);

			if (response.data.success) {
				const newLikeStatus: boolean = !isItemLiked;
				setIsItemLiked(newLikeStatus);

				// Update the number of likes in the state
				const newLikes: number = isItemLiked ? likes - 1 : likes + 1;
				onLikeUpdate(id, newLikes, newLikeStatus);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLiking(false);
		}
	};

	const handleCopy = (): void => {
		setIsCopied(true);
		navigator.clipboard.writeText(`${window.location.origin}/${type}/${id}`);

		setTimeout(() => {
			setIsCopied(false);
		}, 3000);
	};

	useEffect(() => {
		if (liking) {
			setLikeIcon(LoadingIcon);
		} else {
			setLikeIcon(isItemLiked ? LikedIcon : LikeIcon);
		}
	}, [isItemLiked, liking]);

	return (
		<div className="flex flex-row gap-3">
			{/* Copy Link */}
			<div className="flex items-center">
				{isCopied ? (
					<Reveal width="fit-content" animation="fade" delay={0} duration={0.7}>
						<div className="flex items-center justify-center">
							<LazyLoadImage
								src={CopiedIcon}
								alt={'Copy' + type + 'Link'}
								effect="opacity"
								className="cursor-pointer hover:opacity-80"
								width={20}
							/>
						</div>
					</Reveal>
				) : (
					<LazyLoadImage
						src={CopyIcon}
						alt={'Copy' + type + 'Link'}
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
					alt={'Like' + type}
					effect="opacity"
					className={classNames({
						'cursor-pointer hover:opacity-80': loggedUser && !liking,
						'cursor-default animate-spin': liking,
					})}
					width={22}
					onClick={handleLike}
				/>

				{/* Like Count */}
				<span className="ml-1 text-sm font-semibold">{formatData.likes(likes)}</span>
			</div>

			{/* Comments */}
			<div className="flex items-center">
				<Link to={`/${type}/${id}#comments`} className="flex items-center">
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
					{formatData.comments(comments)}
				</span>
			</div>
		</div>
	);
};

export default PostUserActions;
