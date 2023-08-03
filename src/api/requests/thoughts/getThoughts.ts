import { AxiosResponse } from 'axios';
import api from '../../axios.config';
import { ResponseData } from '../types';
import { handleError } from '../utils';

interface LocalRequestData extends ResponseData {
	data?: {
		thoughts: {
			id: number;
			content: string;
			edited: boolean;
			author: {
				id: number;
				username: string;
				userImage?: {
					cloudinaryImage: string;
				};
			};
			likes: number;
			comments: number;
			isAuthor: boolean;
			isLiked: boolean;
			createdAgo: string;
			createdAt: string;
		}[];
		totalCount: number;
	};
}

interface LocalResponse extends AxiosResponse<LocalRequestData> {
	data: LocalRequestData;
}

interface Props {
	filter: 'recent' | 'popular' | 'following';
	authorId?: number;
	page?: number;
	limit?: number;
}

const ROUTE = '/thoughts';

export default async (props: Props): Promise<LocalResponse> => {
	try {
		const response: AxiosResponse<LocalRequestData> = await api.get(ROUTE, {
			params: {
				filter: props.filter,
				authorId: props.authorId,
				page: props.page,
				limit: props.limit,
			},
		});
		return response;
	} catch (error: unknown) {
		return handleError(error);
	}
};
