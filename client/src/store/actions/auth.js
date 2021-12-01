import * as types from './types';
export const authAction = (username) => {
	return {
		type: types.AUTH_LOGIN,
		payload: username,
	};
};

export const logOutAction = () => {
	return {
		type: types.LOGOUT,
	};
};
