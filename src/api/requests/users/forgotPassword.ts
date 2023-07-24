import { AxiosError, AxiosResponse } from 'axios';
import api from '../../axios.config';

interface ResponseData {
	success: boolean;
	message: string;
}

interface Response extends AxiosResponse<ResponseData> {
	data: ResponseData;
}

type ErrorResponse = AxiosResponse;

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

// Helper function to check if the error is an AxiosError
function isAxiosError(error: unknown): error is AxiosError {
	return (error as AxiosError).isAxiosError === true;
}
