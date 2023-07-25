import api from '../../axios.config';
import { Response } from '../types';
import { handleError } from '../utils';

const ROUTE = '/users/forgot-password';

export default async (email: string): Promise<Response> => {
	try {
		const bodyData = { email };

		const response: Response = await api.post(ROUTE, bodyData);
		return response;
	} catch (error: unknown) {
		return handleError(error);
	}
};
