import { IThought } from '../../types/types';

export interface ThoughtProps {
	thought: IThought;
	isAdmin: boolean;
	isBlocked: boolean;
}
