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
	createdAt: string;
}

export interface IRecipe {
	id: number;
	title: string;
	description?: string;
	author: {
		id: number;
		username: string;
	};
	recipeImages: {
		id: number;
		cloudinaryImage: string;
	}[];
	likes: number;
	comments: number;
	isAuthor: boolean;
	isLiked: boolean;
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
}
