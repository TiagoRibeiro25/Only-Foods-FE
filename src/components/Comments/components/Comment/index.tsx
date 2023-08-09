import { useContext } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import UserPlaceholderPicture from '../../../../assets/imgs/user.webp';
import { UserContext } from '../../../../contextProviders/UserContext';
import { IComment } from '../../../../types/types';
import formatData from '../../../../utils/formatData';
import HTMLText from '../../../HTMLText';

const Comment = (props: IComment) => {
	const { loggedUser } = useContext(UserContext);

	return (
		<div id={`comment-${props.id}`} className="mb-16">
			{/* First Row */}
			<div className="flex flex-row">
				<Link
					to={`/profile/${props.author.id === loggedUser?.id ? 'me' : props.author.id}`}
				>
					<LazyLoadImage
						className="rounded-full"
						src={props.author.userImage?.cloudinaryImage ?? UserPlaceholderPicture}
						alt="User Profile Picture"
						effect="blur"
						style={{ width: '55px', height: '55px' }}
					/>
				</Link>

				<div className="flex flex-col ml-4">
					<h3 className="text-lg font-semibold">
						<Link
							to={`/profile/${
								props.author.id === loggedUser?.id ? 'me' : props.author.id
							}`}
							className="hover:underline"
						>
							{props.author.username}{' '}
						</Link>
						{props.author.id === loggedUser?.id && (
							<span className="text-sm text-gray-500">(You)</span>
						)}
					</h3>
					<p className="text-sm text-gray-500">{formatData.timeAgo(props.createdAt)} </p>
				</div>
			</div>

			{/* Second Row */}
			<div className="my-4">
				<HTMLText text={props.content} />
			</div>
		</div>
	);
};

export default Comment;
