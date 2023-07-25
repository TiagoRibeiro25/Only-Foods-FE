import { AxiosError } from 'axios';

// Helper function to check if the error is an AxiosError
export function isAxiosError(error: unknown): error is AxiosError {
	return (error as AxiosError).isAxiosError === true;
}
