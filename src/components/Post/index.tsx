import { LazyLoadImage } from 'react-lazy-load-image-component';
import UserPlaceholderPicture from '../../assets/imgs/user.png';

interface Props {
	id: number;
	content: string;
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

const Post = (props: Props) => {
	return (
		<div id={`post-${props.id}`} className="mb-16">
			{/* First Row */}
			<div className="flex flex-row">
				<LazyLoadImage
					className="rounded-full"
					src={props.author.userImage?.cloudinaryImage ?? UserPlaceholderPicture}
					placeholderSrc={UserPlaceholderPicture}
					alt="User Profile Picture"
					effect="opacity"
					style={{ width: '55px', height: '55px' }}
				/>

				<div className="flex flex-col ml-4">
					<h3 className="text-lg font-semibold">{props.author.username}</h3>
					<p className="text-sm text-gray-500">{props.createdAgo}</p>
				</div>
			</div>

			{/* Second Row */}
			<div className="mt-4">
				<p className="text-md">{props.content}</p>
			</div>
		</div>
	);
};

export default Post;
