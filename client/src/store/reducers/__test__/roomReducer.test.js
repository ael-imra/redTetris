import { LIST_ROOMS } from '../../actions/types';
import { listRooms } from '../roomReducer';

it('test add room', () => {
	const action = {
		type: LIST_ROOMS,
		payload: ['hi friend'],
	};
	const listMessage = listRooms([], action);
	expect(listMessage).toEqual(['hi friend']);
});
it('test add room bad action type', () => {
	const action = {
		type: 'sdde',
		payload: 'hi friend',
	};
	const listMessage = listRooms([], action);
	expect(listMessage).toEqual([]);
});

