import * as types from '../../actions/types';
import { errorState } from '../errorReducer';

let action;
it('test with LIVE_ARENA_INIT type', () => {
	action = errorState(null, { type: types.ERROR_ACTIVE, payload: 'test' });
	expect(action.state).toEqual(true);
	expect(action.content).toEqual('test');
});
it('test with ERROR_CLOSE type', () => {
	action = errorState(null, { type: types.ERROR_CLOSE });
	expect(action.state).toEqual(false);
	expect(action.content).toEqual('');
});
