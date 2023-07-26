import api from '../../axios.config';
import { Response } from '../types';
import { handleError } from '../utils';

interface Props {
	email: string;
	password: string;
	rememberMe: boolean;
}

const ROUTE = '/users/login';

export default async (props: Props): Promise<Response> => {
	try {
		const response: Response = await api.post(ROUTE, props);
		return response;
	} catch (error) {
		return handleError(error);
	}
};
