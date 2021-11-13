import * as types from '../actions/types';
export const authReducer = (state = false, action) => {
  switch (action.type) {
    case types.AUTH_LOGIN:
      return action.payload;
    case types.LOGOUT:
      return action.payload;
    default:
      return state;
  }
};
