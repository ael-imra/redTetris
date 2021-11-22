import * as types from '../actions/types';
export const authReducer = (state = null, action) => {
	switch (action.type) {
		case types.AUTH_LOGIN:
			return action.payload;
		case types.LOGOUT:
			return false;
		default:
			return state;
	}
};
