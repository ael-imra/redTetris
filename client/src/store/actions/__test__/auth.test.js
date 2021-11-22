import { authAction, logOutAction } from '../auth';
import * as types from '../types';

it('has the correct type', () => {
	const actionCreator = authAction('sel-hamr');
	expect(actionCreator.type).toEqual(types.AUTH_LOGIN);
});

it('has the correct payload', () => {
	const actionCreator = authAction('sel-hamr');
	expect(actionCreator.payload).toEqual('sel-hamr');
});

it('has the correct type ==>logOutAction', () => {
	const actionCreator = logOutAction('');
	expect(actionCreator.type).toEqual(types.LOGOUT);
});
