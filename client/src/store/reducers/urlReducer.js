import * as types from '../actions/types';
export const urlReducer = (state = '/', action) => {
  switch (action.type) {
    case types.URL_CHANGE:
      return action.payload;
    default:
      return state;
  }
};
