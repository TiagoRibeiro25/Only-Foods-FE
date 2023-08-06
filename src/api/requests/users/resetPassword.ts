import api from '../../axios.config';
import { Response } from '../types';
import { handleError } from '../utils';

interface Props {
	token: string;
	password: string;
}

export default async (props: Props): Promise<Response> => {
	try {
		const response: Response = await api.patch(`/users/reset-password/${props.token}`, {
			password: props.password,
		});
		return response;
	} catch (error: unknown) {
		return handleError(error);
	}
};
