import api from '../../axios.config';
import { Response } from '../types';
import { handleError } from '../utils';

interface Props {
	id: number;
	content: string;
}

const ROUTE = '/thoughts';

export default async (props: Props): Promise<Response> => {
	try {
		const response: Response = await api.put(`${ROUTE}/${props.id}`, {
			content: props.content,
		});
		return response;
	} catch (error) {
		return handleError(error);
	}
};
