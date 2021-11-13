import { ADD_MESSAGE } from '../../actions/types';
import { addMessage } from '../message';

let actionCreator;
beforeEach(() => (actionCreator = addMessage('test')));

it('has the correct type', () => {
	expect(actionCreator.type).toEqual(ADD_MESSAGE);
});
it('has the correct payload', () => {
	expect(actionCreator.payload).toEqual('test');
});
