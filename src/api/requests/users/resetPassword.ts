import api from '../../axios.config';
import { Response } from '../types';
import { handleError } from '../utils';

interface Props {
	token: string;
	password: string;
}

const ROUTE = '/users/reset-password';

export default async (props: Props): Promise<Response> => {
	try {
		const route = `${ROUTE}/${props.token}`;
		const bodyData = { password: props.password };

		const response: Response = await api.patch(route, bodyData);
		return response;
	} catch (error: unknown) {
		return handleError(error);
	}
};
