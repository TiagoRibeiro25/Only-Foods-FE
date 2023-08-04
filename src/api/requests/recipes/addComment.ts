import api from '../../axios.config';
import { Response } from '../types';
import { handleError } from '../utils';

interface Props {
	id: number;
	content: string;
}

const ROUTE = '/comments';

export default async (props: Props): Promise<Response> => {
	try {
		const response: Response = await api.post(`${ROUTE}/${props.id}/recipe`, {
			comment: props.content,
		});

		return response;
	} catch (error) {
		return handleError(error);
	}
};
