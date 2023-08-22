import { AxiosResponse } from 'axios';
import { IUser } from '../../../types/types';
import api from '../../axios.config';
import { ResponseData } from '../types';
import { handleError } from '../utils';

type ExcludedData = 'email' | 'followers' | 'following' | 'isLoggedUser' | 'createdAt';

export type UserDataType = 'following' | 'followers';

export interface FollowUserData extends Omit<IUser, ExcludedData> {}

interface LocalRequestData extends ResponseData {
	data?: FollowUserData[];
}

interface LocalResponse extends AxiosResponse<LocalRequestData> {
	data: LocalRequestData;
}

async function fetchFollowData(
	id: number | 'me',
	type: UserDataType,
): Promise<LocalResponse> {
	try {
		const response: AxiosResponse<LocalRequestData> = await api.get(
			`/users/${id}/followers?type=${type}`,
		);
		return response;
	} catch (error: unknown) {
		return handleError(error);
	}
}

const getFollowers = (id: number | 'me'): Promise<LocalResponse> => {
	return fetchFollowData(id, 'followers');
};

const getFollowing = (id: number | 'me'): Promise<LocalResponse> => {
	return fetchFollowData(id, 'following');
};

export { getFollowers, getFollowing };
