import api from '../../axios.config';
import { Response } from '../types';
import { handleError } from '../utils';

interface Props {
	username?: string;
	email?: string;
	description?: string;
	picture?: string;
}

export default async (props: Props): Promise<Response> => {
	try {
		const response: Response = await api.patch('/users', {
			username: props.username,
			email: props.email,
			description: props.description,
			picture: props.picture,
		});
		return response;
	} catch (error: unknown) {
		return handleError(error);
	}
};
