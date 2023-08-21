import { AxiosResponse } from 'axios';
import { IUser } from '../../../types/types';
import api from '../../axios.config';
import { ResponseData } from '../types';
import { handleError } from '../utils';

// Local interface with the desired response data
interface LocalResponseData extends ResponseData {
	data?: IUser;
}

// Local version of the Response type
interface LocalResponse extends AxiosResponse<LocalResponseData> {
	data: LocalResponseData;
}

export default async (id: number | 'me'): Promise<LocalResponse> => {
	try {
		const response: AxiosResponse<LocalResponseData> = await api.get(`/users/${id}`);
		return response;
	} catch (error: unknown) {
		return handleError(error);
	}
};
