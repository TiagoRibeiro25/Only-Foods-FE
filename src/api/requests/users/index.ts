import forgotPassword from './forgotPassword';
import { getFollowers, getFollowing } from './getFollowData';
import getLoggedUser from './getLoggedUser';
import getUser from './getUser';
import handleBlockUser from './handleBlockUser';
import handleFollow from './handleFollow';
import login from './login';
import logout from './logout';
import register from './register';
import resetPassword from './resetPassword';

export default {
	forgotPassword,
	resetPassword,
	register,
	login,
	getLoggedUser,
	logout,
	getUser,
	handleFollow,
	handleBlockUser,
	getFollowers,
	getFollowing,
};
