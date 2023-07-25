import api from '../../axios.config';
import { ErrorResponse, Response } from '../types';
import { isAxiosError } from '../utils';

interface Props {
	token: string;
	password: string;
}

export default async (props: Props): Promise<Response> => {
	try {
		const response: Response = await api.patch(`/users/reset-password/${props.token}`, {
			password: props.password,
		});

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
