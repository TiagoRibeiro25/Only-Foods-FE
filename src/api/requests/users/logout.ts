import api from '../../axios.config';
import { Response } from '../types';
import { handleError } from '../utils';

export default async (): Promise<Response> => {
	try {
		const response: Response = await api.post('/users/logout');
		return response;
	} catch (error) {
		return handleError(error);
	}
};
