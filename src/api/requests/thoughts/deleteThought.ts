import { AxiosResponse } from 'axios';
import api from '../../axios.config';
import { ResponseData } from '../types';
import { handleError } from '../utils';

const ROUTE = '/thoughts';

interface Props {
	id: number;
}

export default async (props: Props): Promise<AxiosResponse<ResponseData>> => {
	try {
		const response: AxiosResponse<ResponseData> = await api.delete(
			`${ROUTE}/${props.id}`,
		);

		response.data = {
			success: true,
			message: 'Thought deleted successfully',
		};

		return response;
	} catch (error: unknown) {
		return handleError(error);
	}
};
