import { LIST_ROOMS } from '../../actions/types';
import { addRoom } from '../rooms';

let actionCreator;
beforeEach(() => (actionCreator = addRoom('test')));

it('has the correct type', () => {
	expect(actionCreator.type).toEqual(LIST_ROOMS);
});
it('has the correct payload', () => {
	expect(actionCreator.payload).toEqual('test');
});
