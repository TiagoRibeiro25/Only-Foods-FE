import { AxiosResponse } from 'axios';
import api from '../../axios.config';
import { ResponseData } from '../types';
import { handleError } from '../utils';

// Local interface with the desired response data
interface LocalResponseData extends ResponseData {
	data?: {
		id: number;
		content: string;
		edited: boolean;
		createdAt: string;
		author: {
			id: number;
			username: string;
			userImage?: {
				cloudinaryImage: string;
			};
		};
		likes: number;
		comments: number;
		createdAgo: string;
		isLiked?: boolean;
		isAuthor?: boolean;
	};
}

// Local version of the Response type
interface LocalResponse extends AxiosResponse<LocalResponseData> {
	data: LocalResponseData;
}

const ROUTE = '/thoughts';

export default async (id: number): Promise<LocalResponse> => {
	try {
		const response: AxiosResponse<LocalResponseData> = await api.get(ROUTE + '/' + id);
		return response;
	} catch (error: unknown) {
		return handleError(error);
	}
};
