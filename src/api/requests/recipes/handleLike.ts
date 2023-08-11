import api from '../../axios.config';
import { Response } from '../types';
import { handleError } from '../utils';

export default async (id: number): Promise<Response> => {
	try {
		const response: Response = await api.patch(`/likes/${id}/recipe`);
		return response;
	} catch (error) {
		return handleError(error);
	}
};
