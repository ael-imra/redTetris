import * as types from '../actions/types';
export const listRooms = (state = [], action) => {
	switch (action.type) {
		case types.LIST_ROOMS:
			return [...action.payload];
		case types.ADD_USER_NUM_TO_ROOMS:
			const index = state.findIndex((x) => x.name === action.payload.name);
			if (index !== -1) {
				const newState = state;
				newState[index].number = action.payload.number;
				return newState;
			} else return state;
		default:
			return state;
	}
};
