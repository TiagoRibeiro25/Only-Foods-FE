import { AxiosResponse } from 'axios';
import api from '../../axios.config';
import { ResponseData } from '../types';
import { handleError } from '../utils';

interface LocalRequestData extends ResponseData {
	data?: {
		comments: {
			id: number;
			content: string;
			author: {
				id: number;
				username: string;
				userImage?: {
					cloudinaryImage: string;
				};
			};
			createdAt: string;
			createdAgo: string;
		}[];
		totalCount: number;
	};
}

interface LocalResponse extends AxiosResponse<LocalRequestData> {
	data: LocalRequestData;
}

interface Props {
	id: number;
	page?: number;
	limit?: number;
}

export default async (props: Props): Promise<LocalResponse> => {
	try {
		const response: AxiosResponse<LocalRequestData> = await api.get(
			`/comments/${props.id}/recipe`,
			{
				params: {
					page: props.page,
					limit: props.limit,
				},
			},
		);
		return response;
	} catch (error: unknown) {
		return handleError(error);
	}
};
