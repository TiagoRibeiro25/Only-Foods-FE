import { AxiosResponse } from 'axios';
import api from '../../axios.config';
import { ResponseData } from '../types';
import { handleError } from '../utils';

interface LocalRequestData extends ResponseData {
	data?: {
		id: number;
		content: string;
		authorId: number;
		thoughtId?: number;
		recipeId?: number;
		createdAt: string;
		updatedAt: string;
	};
}

interface LocalResponse extends AxiosResponse<LocalRequestData> {
	data: LocalRequestData;
}

interface Props {
	id: number;
	content: string;
}

export default async (props: Props): Promise<LocalResponse> => {
	try {
		const response: AxiosResponse<LocalRequestData> = await api.post(
			`/comments/${props.id}/thought`,
			{ comment: props.content },
		);

		return response;
	} catch (error) {
		return handleError(error);
	}
};
