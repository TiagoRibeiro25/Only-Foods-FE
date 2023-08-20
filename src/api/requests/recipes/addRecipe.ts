import { AxiosResponse } from 'axios';
import api from '../../axios.config';
import { ResponseData } from '../types';
import { handleError } from '../utils';

interface LocalRequestData extends ResponseData {
	data?: {
		recipe: {
			id: number;
			title: string;
			description: string;
			authorId: number;
			ingredients: string[];
			instructions: string[];
			notes: string;
			createdAt: string;
			updatedAt: string;
		};
		images: {
			id: number;
			cloudinaryId: string;
			cloudinaryImage: string;
			recipeId: number;
		}[];
	};
}

interface LocalResponse extends AxiosResponse<LocalRequestData> {
	data: LocalRequestData;
}

interface Props {
	title: string;
	description?: string;
	ingredients: string[];
	instructions: string[];
	notes?: string;
	recipeImages?: string[];
}

export default async (props: Props): Promise<LocalResponse> => {
	try {
		const response: AxiosResponse<LocalRequestData> = await api.post('/recipes', {
			...props,
		});

		return response;
	} catch (error) {
		return handleError(error);
	}
};
