import * as types from './types';
export const addMessage = (content) => {
	return {
		type: types.ADD_MESSAGE,
		payload: content,
	};
};
