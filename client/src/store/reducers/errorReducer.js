import * as types from '../actions/types';
export const errorState = (state = { state: false, content: '' }, action) => {
	switch (action.type) {
		case types.ERROR_ACTIVE:
			return { state: true, content: action.payload };
		case types.ERROR_CLOSE:
			return { state: false, content: '' };
		default:
			return state;
	}
};
