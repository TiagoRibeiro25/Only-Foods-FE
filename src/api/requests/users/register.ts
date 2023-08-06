import api from '../../axios.config';
import { Response } from '../types';
import { handleError } from '../utils';

interface Props {
	username: string;
	email: string;
	password: string;
}

export default async (props: Props): Promise<Response> => {
	try {
		const response: Response = await api.post('/users', props);
		return response;
	} catch (error) {
		return handleError(error);
	}
};
