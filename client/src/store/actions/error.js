import * as types from './types';
export const errorActive = (error) => {
	return {
		type: types.ERROR_ACTIVE,
		payload: error,
	};
};
export const errorClose = () => {
	return {
		type: types.ERROR_CLOSE,
	};
};
