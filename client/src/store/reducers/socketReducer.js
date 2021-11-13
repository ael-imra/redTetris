import * as types from '../actions/types';

export const socket = (state = null, action) => {
	switch (action.type) {
		case types.SOCKET_CONNECT:
			return action.payload;
		default:
			return state;
	}
};
