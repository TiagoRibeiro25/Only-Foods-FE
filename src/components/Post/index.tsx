import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import requests from '../../api/requests';
import DeleteIcon from '../../assets/icons/delete.svg';
import EditIcon from '../../assets/icons/edit.svg';
import LoadingIcon from '../../assets/icons/loading.svg';
import UserPlaceholderPicture from '../../assets/imgs/user.png';
import ConfirmActionModal from '../ConfirmActionModal';

interface Props {
	thought: {
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
	};
	isAdmin: boolean;
	onDelete: (id: number) => void;
}

const Post = (props: Props) => {
	const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
	const [deletingPost, setDeletingPost] = useState<boolean>(false);

	const paragraphs = props.thought.content.split('\n'); // Split content into paragraphs

	// Regular expression to identify links in the paragraph and capture the link text and URL
	const linkRegex = /(?:(?:https?|ftp):\/\/|www\.)[^\s/$.?#].[^\s]*/gi;

	// Function to replace links with anchor tags
	const renderParagraphWithLinks = (paragraph: string): React.JSX.Element => {
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

		// If there are links in the paragraph, replace them with anchor tags
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
			// If there are no links in the paragraph, return the paragraph as it is
			return (
				<p key={crypto.randomUUID()} className="text-md">
					{paragraph}
				</p>
			);
		}
	};

	const deletePost = async (): Promise<void> => {
		setDeletingPost(true);
		setShowDeleteModal(false);

		try {
			const response = await requests.thoughts.deleteThought({ id: props.thought.id });

			if (response.data.success) {
				props.onDelete(props.thought.id);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setDeletingPost(false);
		}
	};

	return (
		<div id={`post-${props.thought.id}`} className="mb-16">
			{/* First Row */}
			<div className="flex flex-row">
				<LazyLoadImage
					className="rounded-full"
					src={props.thought.author.userImage?.cloudinaryImage ?? UserPlaceholderPicture}
					placeholderSrc={UserPlaceholderPicture}
					alt="User Profile Picture"
					effect="opacity"
					style={{ width: '55px', height: '55px' }}
				/>

				<div className="flex flex-col ml-4">
					<h3 className="text-lg font-semibold">{props.thought.author.username}</h3>
					<p className="text-sm text-gray-500">{props.thought.createdAgo}</p>
				</div>

				{/* Actions - Edit / Delete */}
				<div className="flex items-center justify-end flex-1">
					<div className="flex flex-row items-center justify-end">
						{props.thought.isAuthor && (
							<button className="text-sm text-gray-500 hover:text-gray-700">
								<LazyLoadImage
									src={EditIcon}
									effect="opacity"
									alt="Edit Icon"
									width={20}
									height={20}
								/>
							</button>
						)}

						{(props.thought.isAuthor || props.isAdmin) && (
							<button
								className="ml-4 text-sm text-gray-500 hover:text-gray-700"
								onClick={() => setShowDeleteModal(true)}
							>
								<LazyLoadImage
									src={deletingPost ? LoadingIcon : DeleteIcon}
									className={deletingPost ? 'animate-spin' : ''}
									effect="opacity"
									alt="Edit Icon"
									width={20}
									height={20}
								/>
							</button>
						)}
					</div>
				</div>
			</div>

			{/* Second Row */}
			<div className="mt-4">
				{paragraphs.map(paragraph => {
					if (paragraph.trim() === '') {
						return <br key={crypto.randomUUID()} />;
					} else {
						return renderParagraphWithLinks(paragraph);
					}
				})}
			</div>

			<ConfirmActionModal
				id="confirm-delete-post"
				message="Are you sure you want to delete this post?"
				onConfirm={deletePost}
				onCancel={() => setShowDeleteModal(false)}
				show={showDeleteModal}
			/>
		</div>
	);
};

export default Post;
