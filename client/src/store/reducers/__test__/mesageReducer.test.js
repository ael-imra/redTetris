import { ADD_MESSAGE } from '../../actions/types';
import { addMessage } from '../messageReducer';

it('test add message', () => {
	const action = {
		type: ADD_MESSAGE,
		payload: 'hi friend',
	};
	const listMessage = addMessage([], action);
	expect(listMessage).toEqual(['hi friend']);
});
it('test add message bad action type', () => {
	const action = {
		type: 'sdde',
		payload: 'hi friend',
	};
	const listMessage = addMessage([], action);
	expect(listMessage).toEqual([]);
});
