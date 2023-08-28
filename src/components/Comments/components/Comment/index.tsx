import { useContext } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import UserPlaceholderPicture from '../../../../assets/imgs/user.webp';
import { UserContext } from '../../../../contextProviders/UserContext';
import { IComment } from '../../../../types/types';
import formatData from '../../../../utils/formatData';
import AuthorName from '../../../AuthorName';
import HTMLText from '../../../HTMLText';

const Comment: React.FC<IComment> = ({ id, content, author, createdAt }) => {
	const { loggedUser } = useContext(UserContext);

	return (
		<div id={`comment-${id}`} className="mb-16">
			{/* First Row */}
			<div className="flex flex-row">
				<Link to={`/user/${author.id === loggedUser?.id ? 'me' : author.id}`}>
					<LazyLoadImage
						className="object-cover object-center rounded-full"
						src={author.userImage?.cloudinaryImage ?? UserPlaceholderPicture}
						alt="User Profile Picture"
						effect="blur"
						style={{ width: '55px', height: '55px' }}
					/>
				</Link>

				<div className="flex flex-col ml-4">
					<h3 className="text-lg font-semibold">
						<Link
							to={`/user/${author.id === loggedUser?.id ? 'me' : author.id}`}
							className="hover:underline"
						>
							<AuthorName authorName={author.username} isBlocked={author.blocked} />
						</Link>
						{author.id === loggedUser?.id && (
							<span className="text-sm text-gray-500">(You)</span>
						)}
					</h3>
					<p className="text-sm text-gray-500">{formatData.timeAgo(createdAt)} </p>
				</div>
			</div>

			{/* Second Row */}
			<div className="my-4">
				<HTMLText text={content} />
			</div>
		</div>
	);
};

export default Comment;
