import { IThought } from '../../types/types';

export interface ThoughtProps {
	thought: IThought;
	isAdmin: boolean;
	isBlocked: boolean;
	onDelete: (id: number) => void;
	onEdit: (id: number, content: string) => void;
	onLikeUpdate: (id: number, newLikes: number, isLiked: boolean) => void;
}
