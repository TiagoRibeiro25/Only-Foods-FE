import api from '../../axios.config';
import { ErrorResponse, Response } from '../types';
import { isAxiosError } from '../utils';

export default async (email: string): Promise<Response> => {
	try {
		const response: Response = await api.post('/users/forgot-password', { email });
		return response;
	} catch (error: unknown) {
		if (isAxiosError(error)) {
			if (error.response) {
				// Return your custom ErrorResponse for handling error responses
				return error.response as ErrorResponse;
			}
		}
		// Handle other types of errors (e.g., network error) or custom errors
		throw error;
	}
};
