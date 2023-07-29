import api from '../../axios.config';
import { Response } from '../types';
import { handleError } from '../utils';

const ROUTE = '/users/logout';

export default async (): Promise<Response> => {
	try {
		const response: Response = await api.post(ROUTE);
		return response;
	} catch (error) {
		return handleError(error);
	}
};
