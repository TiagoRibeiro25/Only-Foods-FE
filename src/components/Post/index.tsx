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
	const paragraphs = props.content.split('\n'); // Split content into paragraphs

	// Regular expression to identify links in the paragraph and capture the link text and URL
	const linkRegex = /(?:(?:https?|ftp):\/\/|www\.)[^\s/$.?#].[^\s]*/gi;

	// Function to replace links with anchor tags
	const renderParagraphWithLinks = (paragraph: string) => {
		const matches = paragraph.match(linkRegex);

		// if the link doesn't have http or https, add http to it
		// if it has www replace it with http

		const newMatches = matches?.map(match => {
			if (match.startsWith('www')) {
				return `http://${match}`;
			} else {
				return match;
			}
		});

		if (newMatches && newMatches.length > 0) {
			return (
				<p key={crypto.randomUUID()} className="text-md">
					{paragraph.split(linkRegex).map((part, index) => {
						if (index % 2 === 0) {
							return part; // Non-link text
						} else {
							// Link text and URL
							return (
								<a
									key={crypto.randomUUID()}
									href={newMatches[index - 1]}
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-500 hover:underline"
								>
									{newMatches[index - 1].replace(/(^\w+:|^)\/\//, '')}
								</a>
							);
						}
					})}
				</p>
			);
		} else {
			return (
				<p key={crypto.randomUUID()} className="text-md">
					{paragraph}
				</p>
			);
		}
	};

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
				{/* Render paragraphs */}
				{paragraphs.map(paragraph => {
					if (paragraph.trim() === '') {
						return <br key={crypto.randomUUID()} />;
					} else {
						return renderParagraphWithLinks(paragraph);
					}
				})}
			</div>
		</div>
	);
};

export default Post;
