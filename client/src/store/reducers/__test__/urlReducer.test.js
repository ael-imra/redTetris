import { URL_CHANGE } from '../../actions/types';
import { urlReducer } from '../urlReducer';
import * as reducers from '../gameReducer';

it('test add room bad action type', () => {
	const action = {
		type: URL_CHANGE,
		payload: '/',
	};
	let result = urlReducer(null, action);
	expect(result).toEqual('/');
});
