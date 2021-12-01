import * as types from '../actions/types';
export const listRooms = (state = { list: [], nameSearch: '' }, action) => {
	switch (action.type) {
		case types.LIST_ROOMS:
			return { ...state, list: [...action.payload] };
		case types.NAME_SEARCH:
			return { ...state, nameSearch: action.payload };
		default:
			return state;
	}
};
