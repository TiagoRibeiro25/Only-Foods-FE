import { AxiosResponse } from 'axios';
import { IRecipe } from '../../../types/types';
import api from '../../axios.config';
import { ResponseData } from '../types';
import { handleError } from '../utils';

export interface Recipe extends IRecipe {
	ingredients: string[];
	instructions: string[];
	notes: string;
	author: {
		id: number;
		username: string;
		blocked: boolean;
		userImage?: {
			cloudinaryImage: string;
		};
	};
}

interface LocalRequestData extends ResponseData {
	data?: Recipe;
}

interface LocalResponse extends AxiosResponse<LocalRequestData> {
	data: LocalRequestData;
}

export default async (id: number): Promise<LocalResponse> => {
	try {
		const response: AxiosResponse<LocalRequestData> = await api.get(`/recipes/${id}`);
		return response;
	} catch (error) {
		return handleError(error);
	}
};
