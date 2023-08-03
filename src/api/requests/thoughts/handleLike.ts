import api from '../../axios.config';
import { Response } from '../types';
import { handleError } from '../utils';

const ROUTE = '/likes';

export default async (id: number): Promise<Response> => {
	try {
		const response: Response = await api.patch(`${ROUTE}/${id}/thought`);
		return response;
	} catch (error) {
		return handleError(error);
	}
};
