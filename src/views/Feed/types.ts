export type Filter = 'recent' | 'popular' | 'following';

export interface NewThought {
	id: number;
	content: string;
	authorId: number;
	createdAt: string;
	updatedAt: string;
}

export interface NewThoughtFormProps {
	onSubmit: (arg: NewThought) => void;
}
