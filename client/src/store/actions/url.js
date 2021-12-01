import { URL_CHANGE } from './types';
export const changePath = (path = '/') => {
  return {
    type: URL_CHANGE,
    payload: path,
  };
};
