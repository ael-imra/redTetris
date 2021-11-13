import * as types from '../../actions/types';
import * as reducers from '../gameReducer';
it('test init() function', () => {
	const array = reducers.init();
	expect(array.length).toEqual(parseInt(process.env.REACT_APP_HEIGHT_ARENA));

	for (let index = 0; index < parseInt(process.env.REACT_APP_HEIGHT_ARENA); index++) {
		const line = array[index];
		for (let index = 0; index < line.length; index++) {
			const element = line[index];
			expect(element).toEqual(0);
		}
	}
});

describe('test init() function', () => {
	let array;
	beforeEach(() => (array = reducers.init()));
	it('test height of array', () => {
		expect(array.length).toEqual(parseInt(process.env.REACT_APP_HEIGHT_ARENA));
	});
	it('test width of array', () => {
		expect(array[0].length).toEqual(parseInt(process.env.REACT_APP_WIDTH_ARENA));
		expect(array[parseInt(process.env.REACT_APP_WIDTH_ARENA) - 1].length).toEqual(parseInt(process.env.REACT_APP_WIDTH_ARENA));
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

describe('test reducer nextPieceReducer', () => {
	it('test init next piece', () => {
		const nextPiece = reducers.nextPieceReducer([], { type: types.INIT_NEXT_PIECE });
		expect(nextPiece).toEqual(reducers.init(0, true));
	});

	it('test next piece', () => {
		const nextPiece = reducers.nextPieceReducer([], {
			type: types.NEXT_PIECE,
			payload: [
				[1, 1, 0, 0],
				[0, 1, 0, 0],
				[0, 1, 0, 0],
				[0, 0, 0, 0],
			],
		});
		for (let index = 0; index < parseInt(process.env.REACT_APP_WIDTH_ARENA_NEXT_PIECE); index++) {
			const line = nextPiece[index];
			for (let x = 0; x < line.length; x++) {
				const element = nextPiece[index][x];
				if ((index === 0 && x === 0) || (index === 0 && x === 1) || (index === 1 && x === 1) || (index === 2 && x === 1)) expect(element).toEqual(1);
				else expect(element).toEqual(0);
			}
		}
	});
});

describe('test reducer userReducer', () => {
	it('test players users', () => {
		const test_1 = reducers.userReducer({ players: [], userActive: 'root' }, { type: types.ADD_USER, payload: 'test1' });
		expect(test_1.players.length).toEqual(1);
		expect(test_1.players).toEqual(['test1']);
		const test_2 = reducers.userReducer({ players: ['root'], userActive: 'root' }, { type: types.ADD_USER, payload: 'test' });
		expect(test_2.players).toEqual(['root', 'test']);
	});
	it('test remove user', () => {
		const user = reducers.userReducer({ players: ['test1', 'test2', 'test3'], userActive: 'root' }, { type: types.REMOVE_USER, payload: 'test1' });
		expect(user.players.length).toEqual(2);
		expect(user.players).toEqual(['test2', 'test3']);
	});
	it('test remove user bad user', () => {
		const user = reducers.userReducer({ players: ['test1', 'test2', 'test3'], userActive: 'root' }, { type: types.REMOVE_USER, payload: 'tet1' });
		expect(user.players.length).toEqual(3);
		expect(user.players).toEqual(['test1', 'test2', 'test3']);
	});
	it('test user active', () => {
		const user = reducers.userReducer({ players: ['test1', 'test2', 'test3'], userActive: 'root' }, { type: types.USER_ACTIVE, payload: 'no-root' });
		expect(user.userActive).toEqual('no-root');
	});
	it('test init  arenas for users', () => {
		const user = reducers.userReducer({ players: ['test1', 'test2', 'test3'], userActive: 'root' }, { type: types.ARENAS_INIT, payload: ['test-1', 'test-2', 'test-3', 'test-4'] });
		expect(user.arenas).toEqual(reducers.ArenaInit(['test-1', 'test-2', 'test-3', 'test-4']));
	});
	it('test bad type', () => {
		const user = reducers.userReducer({ players: ['test1', 'test2', 'test3'], userActive: 'root' }, { type: 'cefeffe', payload: ['test-1', 'test-2', 'test-3', 'test-4'] });
		expect(user).toEqual({ players: ['test1', 'test2', 'test3'], userActive: 'root' });
	});
});

describe('test reducer startGame', () => {
	it('test start game', () => {
		const gameState = reducers.startGame({ players: [], userActive: 'root' }, { type: types.START_GAME });
		expect(gameState).toEqual(true);
	});
});
