import { AUTH_LOGIN, LOGOUT } from '../../actions/types';
import { authReducer } from '../authReducer';

it('login good test', () => {
	const action = {
		type: AUTH_LOGIN,
		payload: 'soufiane',
	};
	const auth = authReducer(undefined, action);
	expect(auth).toEqual('soufiane');
});
it('login bad test', () => {
	const action = {
		type: 'cdcdc',
		payload: 'soufiane',
	};
	const auth = authReducer(undefined, action);
	expect(auth).toEqual(null);
});

it('logout test', () => {
	const action = {
		type: LOGOUT,
	};
	const auth = authReducer(undefined, action);
	expect(auth).toEqual(false);
});
