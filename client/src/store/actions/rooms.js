import { LIST_ROOMS, NAME_SEARCH } from './types';

export const addRoom = (room) => {
	return {
		type: LIST_ROOMS,
		payload: room,
	};
};

export const nameSearch = (name) => {
	return {
		type: NAME_SEARCH,
		payload: name,
	};
};
