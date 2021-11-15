import { LIST_ROOMS } from './types';

export const addRoom = (room) => {
	return {
		type: LIST_ROOMS,
		payload: room,
	};
};