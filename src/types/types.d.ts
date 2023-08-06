export type ItemType = 'thought' | 'recipe';

export interface IThought {
	id: number;
	content: string;
	edited: boolean;
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

export interface IComment {
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
