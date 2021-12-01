import { LIST_ROOMS, NAME_SEARCH } from '../../actions/types';
import { listRooms } from '../roomReducer';

it('test add room', () => {
	const action = {
		type: LIST_ROOMS,
		payload: ['hi friend'],
	};
	const listMessage = listRooms([], action);
	expect(listMessage).toEqual({ list: ['hi friend'] });
});
it('test add room bad action type', () => {
	const action = {
		type: 'sdde',
		payload: 'hi friend',
	};
	const listMessage = listRooms([], action);
	expect(listMessage).toEqual([]);
});

it('test search name', () => {
	const action = {
		type: NAME_SEARCH,
		payload: 'root',
	};
	const room = listRooms([], action);
	expect(room.nameSearch).toEqual('root');
});
