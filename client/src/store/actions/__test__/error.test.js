import { ERROR_CLOSE, ERROR_ACTIVE } from '../../actions/types';
import { errorClose, errorActive } from '../error';

let actionCreator;
describe('test errorActive action', () => {
	beforeEach(() => (actionCreator = errorActive('bad data')));

	it('has the correct type', () => {
		expect(actionCreator.type).toEqual(ERROR_ACTIVE);
	});
	it('has the correct payload', () => {
		expect(actionCreator.payload).toEqual('bad data');
	});
});

describe('test errorClose action', () => {
	beforeEach(() => (actionCreator = errorClose()));

	it('has the correct type', () => {
		expect(actionCreator.type).toEqual(ERROR_CLOSE);
	});
});
