import * as types from '../../actions/types';
import * as reducers from '../gameReducer';

describe('test init() function', () => {
	let array;
	beforeEach(() => (array = reducers.init()));
	it('test height of array', () => {
		expect(array.length).toEqual(parseInt(process.env.REACT_APP_HEIGHT_ARENA));
	});
	it('test width of array', () => {
		expect(array[0].length).toEqual(parseInt(process.env.REACT_APP_WIDTH_ARENA));
	});
	it('test content of array ', () => {
		for (let index = 0; index < parseInt(process.env.REACT_APP_HEIGHT_ARENA); index++) {
			const line = array[index];
			for (let index = 0; index < line.length; index++) {
				const element = line[index];
				expect(element).toEqual(0);
			}
		}
	});
});
describe('test init() function with parameter', () => {
	let array;
	beforeEach(() => (array = reducers.init(0, true)));
	it('test height of array', () => {
		expect(array.length).toEqual(parseInt(process.env.REACT_APP_WIDTH_ARENA_NEXT_PIECE));
	});

	it('test width of array', () => {
		expect(array[0].length).toEqual(parseInt(process.env.REACT_APP_WIDTH_ARENA_NEXT_PIECE));
		expect(array[parseInt(process.env.REACT_APP_WIDTH_ARENA_NEXT_PIECE) - 1].length).toEqual(parseInt(process.env.REACT_APP_WIDTH_ARENA_NEXT_PIECE));
	});

	it('test content of array ', () => {
		for (let index = 0; index < parseInt(process.env.REACT_APP_WIDTH_ARENA_NEXT_PIECE); index++) {
			const line = array[index];
			for (let index = 0; index < line.length; index++) {
				const element = line[index];
				expect(element).toEqual(0);
			}
		}
	});
});

describe('test ArenaInit() function', () => {
	let array;
	beforeEach(() => (array = reducers.ArenaInit(['test1', 'test2'])));
	it('test height and width and length of arena', () => {
		expect(Object.keys(array).length).toEqual(2);
		expect(array.test1.length).toEqual(parseInt(process.env.REACT_APP_HEIGHT_ARENA));
		expect(array.test2.length).toEqual(parseInt(process.env.REACT_APP_HEIGHT_ARENA));
	});
});

describe('test reducer gameReducer', () => {
	it('test players users', () => {
		const result = reducers.gameReducer({ players: [], userActive: 'root' }, { type: types.ADD_USER, payload: 'test1' });
		expect(result.players.length).toEqual(1);
		expect(result.players).toEqual(['test1']);
		const result_2 = reducers.gameReducer({ players: ['root'], userActive: 'root' }, { type: types.ADD_USER, payload: 'test' });
		expect(result_2.players).toEqual(['root', 'test']);
	});

	it('test remove user', () => {
		const result = reducers.gameReducer({ players: ['test1', 'test2', 'test3'], userActive: 'root' }, { type: types.REMOVE_USER, payload: 'test1' });
		expect(result.players.length).toEqual(2);
		expect(result.players).toEqual(['test2', 'test3']);
	});

	it('test remove user bad user', () => {
		const result = reducers.gameReducer({ players: ['test1', 'test2', 'test3'], userActive: 'root' }, { type: types.REMOVE_USER, payload: 'tet1' });
		expect(result.players.length).toEqual(3);
		expect(result.players).toEqual(['test1', 'test2', 'test3']);
	});

	it('test user active', () => {
		const result = reducers.gameReducer({ players: ['test1', 'test2', 'test3'], userActive: 'root' }, { type: types.USER_ACTIVE, payload: 'no-root' });
		expect(result.userActive).toEqual('no-root');
	});

	it('test init  arenas for users', () => {
		const result = reducers.gameReducer(null, { type: types.ARENAS_INIT, payload: ['test-1', 'test-2', 'test-3', 'test-4'] });
		expect(result.arenas).toEqual(reducers.ArenaInit(['test-1', 'test-2', 'test-3', 'test-4']));
	});

	it('test bad type', () => {
		const result = reducers.gameReducer({ players: ['test1', 'test2', 'test3'], userActive: 'root' }, { type: 'cefeffe', payload: ['test-1', 'test-2', 'test-3', 'test-4'] });
		expect(result).toEqual({ players: ['test1', 'test2', 'test3'], userActive: 'root' });
	});
	it('test pause game reducer', () => {
		const result = reducers.gameReducer({ pause: false }, { type: types.PAUSE_GAME });
		expect(result).toEqual({ pause: true });
	});

	it('test continue game reducer', () => {
		const result = reducers.gameReducer({ pause: true }, { type: types.PAUSE_GAME });
		expect(result).toEqual({ pause: false });
	});

	it('test pause game reducer', () => {
		const result = reducers.gameReducer({ pause: false, players: ['test1', 'test2', 'test3'], userActive: 'root' }, { type: types.RESET_GAME });
		expect(result).toEqual({});
	});

	it('test with NEW_ARENAS types', () => {
		const result = reducers.gameReducer({ players: ['test1', 'test2', 'test3'], arenas: [] }, { type: types.NEW_ARENAS, payload: { user: 'test1', newArena: 'new Arena' } });
		expect(result.arenas['test1']).toEqual('new Arena');
	});

	it('test with STATE_GAME types', () => {
		const result = reducers.gameReducer(null, { type: types.STATE_GAME, payload: 'win' });
		expect(result.stateGame).toEqual('win');
	});

	it('test with NEW_ARENA types', () => {
		const result = reducers.gameReducer(null, { type: types.NEW_ARENA, payload: 'NEW_ARENA' });
		expect(result.arenaTmp).toEqual('NEW_ARENA');
	});

	it('test with CHANGE_HOSTED types', () => {
		const result = reducers.gameReducer({ hosted: 'soufiane' }, { type: types.CHANGE_HOSTED, payload: 'root' });
		expect(result.hosted).toEqual('root');
	});

	it('test with NEW_SCORE types', () => {
		const result = reducers.gameReducer(null, { type: types.NEW_SCORE, payload: 100 });
		expect(result.score).toEqual(100);
	});

	it('test with INIT_GAME types', () => {
		const result = reducers.gameReducer({ refBoxChat: 'ok' }, { type: types.INIT_GAME, payload: { name: 'test1' } });
		expect(result.nextPiece).toEqual(reducers.init(0, true));
		expect(result.arenaTmp).toEqual(reducers.init());
		expect(result.liveArena).toEqual(reducers.init());
		expect(result.refBoxChat).toEqual('ok');
		expect(result.score).toEqual(0);
	});

	it('test reference BoxChat reducer', () => {
		const result = reducers.gameReducer(
			{ pause: false, players: ['test1', 'test2', 'test3'], userActive: 'root', refBoxChat: '' },
			{ type: types.ADD_REFERENCE_BOX, payload: 'refBoxChat' }
		);
		expect(result.refBoxChat).toEqual('refBoxChat');
	});
	it('test add message reducer', () => {
		const result = reducers.gameReducer(
			{
				messages: [
					{ name: 'ShadowRoot', message: 'test' },
					{ name: 'ShadowRoot2', message: 'test2' },
				],
			},
			{ type: types.ADD_MESSAGE, payload: { name: 'root', message: 'yhh' } }
		);
		expect(result.messages[0]).toEqual({ name: 'ShadowRoot', message: 'test' });
		expect(result.messages[1]).toEqual({ name: 'ShadowRoot2', message: 'test2' });
		expect(result.messages[2]).toEqual({ name: 'root', message: 'yhh' });
	});
	it('test start game', () => {
		const result = reducers.gameReducer({ players: [], userActive: 'root' }, { type: types.START_GAME });
		expect(result.startGame).toEqual(true);
	});
	it('test with ARENA_INIT type', () => {
		const result = reducers.gameReducer([], { type: types.ARENA_INIT });
		expect(result.arenaTmp).toEqual(reducers.init());
	});

	it('test with LIVE_ARENA_INIT type', () => {
		const result = reducers.gameReducer([], { type: types.LIVE_ARENA_INIT });
		expect(result.liveArena).toEqual(reducers.init());
	});

	it('test with LIVE_ARENA_INIT type', () => {
		const result = reducers.gameReducer([], { type: types.LIVE_ARENA, payload: 'new Arena' });
		expect(result.liveArena).toEqual('new Arena');
	});

	it('test init next piece', () => {
		const action = reducers.gameReducer([], { type: types.INIT_NEXT_PIECE });
		expect(action.nextPiece).toEqual(reducers.init(0, true));
	});
	it('test with CHANGE_OPTIONS type', () => {
		const action = reducers.gameReducer([], { type: types.CHANGE_OPTIONS, payload: { name: 'options' } });
		expect(action.options.name).toEqual('options');
	});

	it('test next piece', () => {
		const action = reducers.gameReducer([], {
			type: types.NEXT_PIECE,
			payload: [
				[1, 1, 0, 0, 0],
				[0, 1, 0, 0, 0],
				[0, 1, 0, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0],
			],
		});
		for (let index = 0; index < parseInt(process.env.REACT_APP_WIDTH_ARENA_NEXT_PIECE); index++) {
			const line = action.nextPiece[index];
			for (let x = 0; x < line.length; x++) {
				const element = line[x];
				if ((index === 0 && x === 0) || (index === 0 && x === 1) || (index === 1 && x === 1) || (index === 2 && x === 1)) expect(element).toEqual(1);
				else expect(element).toEqual(0);
			}
		}
	});
});
