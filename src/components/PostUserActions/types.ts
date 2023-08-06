import { ItemType } from '../../types/types';

export interface PostUserActionsProps {
	type: ItemType;
	id: number;
	likes: number;
	comments: number;
	isLiked: boolean;
	onLikeUpdate: (id: number, newLikes: number, isLiked: boolean) => void;
}
