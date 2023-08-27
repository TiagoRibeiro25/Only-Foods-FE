import { AxiosResponse } from 'axios';
import { IUser } from '../../../types/types';
import api from '../../axios.config';
import { ResponseData } from '../types';
import { handleError } from '../utils';

interface LocalRequestData extends ResponseData {
	data?: {
		users: IUser[];
		totalCount: number;
	};
}

interface LocalResponse extends AxiosResponse<LocalRequestData> {
	data: LocalRequestData;
}

interface Props {
	keyword: string;
	page?: number;
	limit?: number;
}

export default async (props: Props): Promise<LocalResponse> => {
	try {
		const response: AxiosResponse<LocalRequestData> = await api.get('/users/search', {
			params: {
				keyword: props.keyword,
				page: props.page,
				limit: props.limit,
			},
		});
		return response;
	} catch (error) {
		return handleError(error);
	}
};
