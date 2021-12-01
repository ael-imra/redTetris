import { LIST_ROOMS, NAME_SEARCH } from '../../actions/types';
import { addRoom, nameSearch } from '../rooms';

let actionCreator;
describe('test add room', () => {
	beforeEach(() => (actionCreator = addRoom('test')));

	it('has the correct type', () => {
		expect(actionCreator.type).toEqual(LIST_ROOMS);
	});
	it('has the correct payload', () => {
		expect(actionCreator.payload).toEqual('test');
	});
});

describe('test search name', () => {
	beforeEach(() => (actionCreator = nameSearch('test')));

	it('has the correct type', () => {
		expect(actionCreator.type).toEqual(NAME_SEARCH);
	});
	it('has the correct payload', () => {
		expect(actionCreator.payload).toEqual('test');
	});
});
