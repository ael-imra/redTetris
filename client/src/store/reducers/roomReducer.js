import * as types from '../actions/types';
export const listRooms = (state = [], action) => {
	switch (action.type) {
		case types.LIST_ROOMS:
			return [...action.payload];
		default:
			return state;
	}
};
