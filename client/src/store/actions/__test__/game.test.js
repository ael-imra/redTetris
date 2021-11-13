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
	let actionCreator;
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

it('has the correct type for action initNextPiece()', () => {
	const actionCreator = actions.initNextPiece();
	expect(actionCreator.type).toEqual(types.INIT_NEXT_PIECE);
});
