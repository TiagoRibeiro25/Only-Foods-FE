import { AxiosError } from 'axios';
import { ErrorResponse } from './types';

// Helper function to check if the error is an AxiosError
export function isAxiosError(error: unknown): error is AxiosError {
	return (error as AxiosError).isAxiosError === true;
}

export function handleError(error: unknown): ErrorResponse {
	if (isAxiosError(error)) {
		if (error.response) {
			return error.response as ErrorResponse;
		}
	}
	// Other types of errors (e.g., network error)
	throw error;
}
