import { AxiosResponse } from 'axios';
import { IComment } from '../../../types/types';
import api from '../../axios.config';
import { ResponseData } from '../types';
import { handleError } from '../utils';

interface LocalRequestData extends ResponseData {
	data?: {
		comments: IComment[];
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
