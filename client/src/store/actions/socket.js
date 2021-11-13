import { SOCKET_CONNECT } from './types';

export const socketConnect = (socket) => {
	return {
		type: SOCKET_CONNECT,
		payload: socket,
	};
};
