import api from '../../axios.config';
import { Response } from '../types';
import { handleError } from '../utils';

export default async (id: number): Promise<Response> => {
	try {
		const response: Response = await api.delete(`/recipes/${id}`);

		response.data = {
			success: true,
			message: 'Thought deleted successfully',
		};

		return response;
	} catch (error: unknown) {
		return handleError(error);
	}
};
