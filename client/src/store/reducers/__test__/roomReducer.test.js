import { LIST_ROOMS, ADD_USER_NUM_TO_ROOMS } from '../../actions/types';
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
it('test add user num ', () => {
	const action = {
		type: ADD_USER_NUM_TO_ROOMS,
		payload: {
			name: 'root',
			number: 7,
		},
	};
	const listNumUserInRoom = listRooms(
		[
			{ name: 'roo', number: 4 },
			{ name: 'root', number: 4 },
			{ name: 'roo', number: 4 },
		],
		action
	);
	expect(listNumUserInRoom.length).toEqual(3);
	expect(listNumUserInRoom[1].number).toEqual(7);
});

it('test add user num by name not found', () => {
	const action = {
		type: ADD_USER_NUM_TO_ROOMS,
		payload: {
			name: 'r',
			number: 7,
		},
	};
	const listNumUserInRoom = listRooms(
		[
			{ name: 'roo', number: 4 },
			{ name: 'root', number: 4 },
			{ name: 'roo', number: 4 },
		],
		action
	);
	const test = listNumUserInRoom.every((room) => room.number === 4);
	expect(test).toEqual(true);
	expect(listNumUserInRoom.length).toEqual(3);
});
