import api from '../../axios.config';
import { Response } from '../types';
import { handleError } from '../utils';

export default async (email: string): Promise<Response> => {
	try {
		const bodyData = { email };

		const response: Response = await api.post('/users/forgot-password', bodyData);
		return response;
	} catch (error: unknown) {
		return handleError(error);
	}
};
