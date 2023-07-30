import { AxiosResponse } from 'axios';
import api from '../../axios.config';
import { ResponseData } from '../types';
import { handleError } from '../utils';

interface LocalRequestData extends ResponseData {
	data?: {
		id: number;
		content: string;
		authorId: number;
		createdAt: string;
		updatedAt: string;
	};
}

interface LocalResponse extends AxiosResponse<LocalRequestData> {
	data: LocalRequestData;
}

interface Props {
	content: string;
}

const ROUTE = '/thoughts';

export default async (props: Props): Promise<LocalResponse> => {
	try {
		const response: AxiosResponse<LocalRequestData> = await api.post(ROUTE, props);
		return response;
	} catch (error: unknown) {
		return handleError(error);
	}
};
