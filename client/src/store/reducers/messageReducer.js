import * as types from '../actions/types';
export const addMessage = (state = [], action) => {
	switch (action.type) {
		case types.ADD_MESSAGE:
			return [...state, action.payload];
		default:
			return state;
	}
};
