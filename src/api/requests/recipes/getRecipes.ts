import { AxiosResponse } from 'axios';
import { IRecipe } from '../../../types/types';
import api from '../../axios.config';
import { ResponseData } from '../types';
import { handleError } from '../utils';

interface LocalRequestData extends ResponseData {
	data?: {
		recipes: IRecipe[];
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

export default async (props: Props): Promise<LocalResponse> => {
	try {
		const response: AxiosResponse<LocalRequestData> = await api.get('/recipes', {
			params: {
				filter: props.filter,
				authorId: props.authorId,
				page: props.page,
				limit: props.limit,
			},
		});
		return response;
	} catch (error) {
		return handleError(error);
	}
};
