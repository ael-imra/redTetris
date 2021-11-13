import { LIST_ROOMS, ADD_USER_NUM_TO_ROOMS } from './types';

export const addRoom = (room) => {
	return {
		type: LIST_ROOMS,
		payload: room,
	};
};
export const addUserToRoom = (number, name) => {
	return {
		type: ADD_USER_NUM_TO_ROOMS,
		payload: {
			number,
			name,
		},
	};
};
