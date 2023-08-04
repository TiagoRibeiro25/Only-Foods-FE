interface CommentProps {
	id: number;
	content: string;
	author: {
		id: number;
		username: string;
		userImage?: {
			cloudinaryImage: string;
		};
	};
	createdAt: string;
	createdAgo: string;
}

const Comment = (props: CommentProps) => {
	return <div>{JSON.stringify(props)}</div>;
};

export default Comment;
