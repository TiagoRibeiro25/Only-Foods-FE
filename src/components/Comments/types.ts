import { IComment, ItemType } from '../../types/types';

export interface CommentsProps {
	type: ItemType;
	id: number;
}

export interface NewComment extends Omit<IComment, 'id'> {}

export interface NewCommentFormProps extends CommentsProps {
	onSubmit: (arg: NewComment) => void;
}
