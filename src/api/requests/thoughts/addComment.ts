import api from '../../axios.config';
import { Response } from '../types';
import { handleError } from '../utils';

interface Props {
	id: number;
	content: string;
}

export default async (props: Props): Promise<Response> => {
	try {
		const response: Response = await api.post(`/comments/${props.id}/thought`, {
			comment: props.content,
		});

		return response;
	} catch (error) {
		return handleError(error);
	}
};
