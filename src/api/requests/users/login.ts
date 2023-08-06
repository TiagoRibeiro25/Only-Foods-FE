import { AxiosResponse } from 'axios';
import api from '../../axios.config';
import { ResponseData } from '../types';
import { handleError } from '../utils';

// Local interface with the desired request data
interface LocalRequestData extends ResponseData {
	data?: {
		user: {
			id: number;
			username: string;
			email: string;
			isAdmin: boolean;
			isBlocked: boolean;
			picture: string;
		};
	};
}

// Local version of the Response type
interface LocalResponse extends AxiosResponse<LocalRequestData> {
	data: LocalRequestData;
}

interface Props {
	email: string;
	password: string;
	rememberMe: boolean;
}

export default async (props: Props): Promise<LocalResponse> => {
	try {
		const response: AxiosResponse<LocalRequestData> = await api.post(
			'/users/login',
			props,
		);
		return response;
	} catch (error: unknown) {
		return handleError(error);
	}
};
