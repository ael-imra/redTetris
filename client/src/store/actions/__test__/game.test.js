import * as types from '../types';
import actions from '../index';

it('has the correct type for action arenaInit()', () => {
	const actionCreator = actions.arenaInit();
	expect(actionCreator.type).toEqual(types.ARENA_INIT);
});

describe('action listUser()', () => {
	let actionCreator;
	beforeEach(() => (actionCreator = actions.listUser(['test1'])));
	it('has the correct type', () => {
		expect(actionCreator.type).toEqual(types.ADD_USER);
	});
	it('has the correct payload', () => {
		expect(actionCreator.payload).toEqual(['test1']);
	});
});

describe('action removeUser()', () => {
	let actionCreator = 0;
	beforeEach(() => (actionCreator = actions.removeUser('test')));
	it('has the correct type', () => {
		expect(actionCreator.type).toEqual(types.REMOVE_USER);
	});
	it('has the correct payload', () => {
		expect(actionCreator.payload).toEqual('test');
	});
});

it('has the correct type for action startGame()', () => {
	const actionCreator = actions.startGame();
	expect(actionCreator.type).toEqual(types.START_GAME);
});

describe('action userActive()', () => {
	let actionCreator;
	beforeEach(() => (actionCreator = actions.userActive('test')));
	it('has the correct type', () => {
		expect(actionCreator.type).toEqual(types.USER_ACTIVE);
	});
	it('has the correct payload', () => {
		expect(actionCreator.payload).toEqual('test');
	});
});

describe('action newArena()', () => {
	let actionCreator;
	beforeEach(
		() =>
			(actionCreator = actions.newArena([
				[1, 2, 3, 4],
				[1, 2, 3, 4],
				[1, 2, 3, 4],
			]))
	);
	it('has the correct type', () => {
		expect(actionCreator.type).toEqual(types.NEW_ARENA);
	});
	it('has the correct payload', () => {
		expect(actionCreator.payload).toEqual([
			[1, 2, 3, 4],
			[1, 2, 3, 4],
			[1, 2, 3, 4],
		]);
	});
});

describe('action arenasInit()', () => {
	let actionCreator;
	beforeEach(() => (actionCreator = actions.arenasInit(['test'])));
	it('has the correct type', () => {
		expect(actionCreator.type).toEqual(types.ARENAS_INIT);
	});
	it('has the correct payload', () => {
		expect(actionCreator.payload).toEqual(['test']);
	});
});

describe('action nextPiece()', () => {
	let actionCreator;
	beforeEach(() => (actionCreator = actions.nextPiece(['test'])));
	it('has the correct type', () => {
		expect(actionCreator.type).toEqual(types.NEXT_PIECE);
	});
	it('has the correct payload', () => {
		expect(actionCreator.payload).toEqual(['test']);
	});
});

describe('action newScore()', () => {
	let actionCreator;
	beforeEach(() => (actionCreator = actions.newScore(100)));
	it('has the correct type', () => {
		expect(actionCreator.type).toEqual(types.NEW_SCORE);
	});
	it('has the correct payload', () => {
		expect(actionCreator.payload).toEqual(100);
	});
});

describe('action stateGame()', () => {
	let actionCreator;
	beforeEach(() => (actionCreator = actions.stateGame('win')));
	it('has the correct type', () => {
		expect(actionCreator.type).toEqual(types.STATE_GAME);
	});
	it('has the correct payload', () => {
		expect(actionCreator.payload).toEqual('win');
	});
});

describe('action newArenas()', () => {
	let actionCreator;
	beforeEach(() => (actionCreator = actions.newArenas('new Arena', 'root')));
	it('has the correct type', () => {
		expect(actionCreator.type).toEqual(types.NEW_ARENAS);
	});
	it('has the correct payload', () => {
		expect(actionCreator.payload).toEqual({ newArena: 'new Arena', user: 'root' });
	});
});

describe('action AddRefBoxMessage()', () => {
	let actionCreator;
	beforeEach(() => (actionCreator = actions.AddRefBoxMessage('test')));
	it('has the correct type', () => {
		expect(actionCreator.type).toEqual(types.ADD_REFERENCE_BOX);
	});
	it('has the correct payload', () => {
		expect(actionCreator.payload).toEqual('test');
	});
});

describe('action addMessage()', () => {
	let actionCreator;
	beforeEach(() => (actionCreator = actions.addMessage('soufiane', 'test')));
	it('has the correct type', () => {
		expect(actionCreator.type).toEqual(types.ADD_MESSAGE);
	});
	it('has the correct payload', () => {
		expect(actionCreator.payload).toEqual({ name: 'test', message: 'soufiane' });
	});
});
describe('action liveArena()', () => {
	let actionCreator;
	beforeEach(
		() =>
			(actionCreator = actions.liveArena([
				[1, 2, 3, 4],
				[1, 2, 3, 4],
				[1, 2, 3, 4],
			]))
	);
	it('has the correct type', () => {
		expect(actionCreator.type).toEqual(types.LIVE_ARENA);
	});
	it('has the correct payload', () => {
		expect(actionCreator.payload).toEqual([
			[1, 2, 3, 4],
			[1, 2, 3, 4],
			[1, 2, 3, 4],
		]);
	});
});

it('has the correct type for action initNextPiece()', () => {
	const actionCreator = actions.initNextPiece();
	expect(actionCreator.type).toEqual(types.INIT_NEXT_PIECE);
});

it('has the correct type for action pauseGame()', () => {
	const actionCreator = actions.pauseGame();
	expect(actionCreator.type).toEqual(types.PAUSE_GAME);
});

it('has the correct type for action liveArenaInit()', () => {
	const actionCreator = actions.liveArenaInit();
	expect(actionCreator.type).toEqual(types.LIVE_ARENA_INIT);
});

it('has the correct type for action ResetGame()', () => {
	const actionCreator = actions.ResetGame();
	expect(actionCreator.type).toEqual(types.RESET_GAME);
});
// game.js           |    92.5 |      100 |      85 |    92.5 | 43,66,28
