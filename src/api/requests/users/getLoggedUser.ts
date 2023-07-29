import { AxiosResponse } from 'axios';
import api from '../../axios.config';
import { ResponseData } from '../types';
import { handleError } from '../utils';

// Local interface with the desired response data
interface LocalResponseData extends ResponseData {
	data?: {
		id: number;
		username: string;
		email: string;
		description?: string;
		blocked: boolean;
		isAdmin: boolean;
		userImage?: {
			cloudinaryImage: string;
		};
		followers: number;
		following: number;
		isLoggedUser: boolean;
	};
}

// Local version of the Response type
interface LocalResponse extends AxiosResponse<LocalResponseData> {
	data: LocalResponseData;
}

const ROUTE = '/users/me';

export default async (): Promise<LocalResponse> => {
	try {
		const response: AxiosResponse<LocalResponseData> = await api.get(ROUTE);
		return response;
	} catch (error: unknown) {
		return handleError(error);
	}
};
