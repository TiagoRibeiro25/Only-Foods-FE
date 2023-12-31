export type ImgMimeType = 'png' | 'jpg' | 'jpeg' | 'bmp' | 'webp';

export type ItemType = 'thought' | 'recipe';

export type Base64Img = `data:image/${ImgMimeType};base64${string}`;

export interface IUser {
	id: number;
	username: string;
	email?: string;
	resetPasswordToken?: string;
	description: string;
	blocked: boolean;
	isAdmin: boolean;
	userImage?: {
		cloudinaryImage: string;
	};
	followers: number;
	following: number;
	isLoggedUser: boolean;
	isFollowing: boolean;
	createdAt: string;
}

export interface IThought {
	id: number;
	content: string;
	edited: boolean;
	author: {
		id: number;
		username: string;
		blocked: boolean;
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
		blocked: boolean;
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
		blocked: boolean;
		userImage?: {
			cloudinaryImage: string;
		};
	};
	createdAt: string;
}
