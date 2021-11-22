import { mount } from 'enzyme';
import Arena from '../../components/Arena';
import Chat from '../../components/Chat';
import NextPiece from '../../components/NextPiece';
import Header from '../../parts/Header';
import LiveGame from '../../parts/LiveGame';
import StartGame from '../../parts/StartGame';
import Root from '../../Root';
import Game from '../Game';

let components;

describe('test before start game in auth === hosted', () => {
	beforeEach(() => {
		components = mount(
			<Root
				initialState={{
					auth: 'root',
					gameInfo: {
						players: ['root', 'root1'],
						hosted: 'root',
						messages: [],
						options: {
							mode: 'single',
						},
					},
					myArena: {
						list: [
							[1, 2, 3, 4],
							[1, 2, 3, 4],
							[1, 2, 3, 4],
							[1, 2, 3, 4],
						],
						liveArena: [
							[1, 2, 3, 4],
							[1, 2, 3, 4],
							[1, 2, 3, 4],
							[1, 2, 3, 4],
						],
					},
					socket: { off: jest.fn(() => {}), on: jest.fn(() => {}) },
					startGame: false,
				}}>
				<Game />
			</Root>
		);
	});

	it('has a header', () => {
		expect(components.find(Header).length).toEqual(1);
		expect(components.find(Header).prop('type')).toEqual('home');
	});

	it('has a StartGame component', () => {
		expect(components.find(StartGame).length).toEqual(1);
	});

	it('not has a Arena component', () => {
		expect(components.find(Arena).length).toEqual(0);
	});

	it('not has a Arena component', () => {
		expect(components.find(Arena).length).toEqual(0);
	});

	it('has a LiveGame component', () => {
		expect(components.find(LiveGame).length).toEqual(1);
	});

	it('has a NextPiece component', () => {
		expect(components.find(NextPiece).length).toEqual(1);
	});
});

describe('test before start game in auth !== hosted', () => {
	beforeEach(() => {
		components = mount(
			<Root
				initialState={{
					auth: 'roodt',
					gameInfo: {
						players: ['root', 'root1'],
						hosted: 'root',
						messages: [],
						options: {
							mode: 'single',
						},
					},
					myArena: {
						list: [
							[1, 2, 3, 4],
							[1, 2, 3, 4],
							[1, 2, 3, 4],
							[1, 2, 3, 4],
						],
						liveArena: [
							[1, 2, 3, 4],
							[1, 2, 3, 4],
							[1, 2, 3, 4],
							[1, 2, 3, 4],
						],
					},
					socket: { off: jest.fn(() => {}), on: jest.fn(() => {}) },
					startGame: false,
				}}>
				<Game />
			</Root>
		);
	});

	it('has a StartGame component', () => {
		expect(components.find(StartGame).length).toEqual(0);
	});

	it('not has a Arena component', () => {
		expect(components.find(Arena).length).toEqual(1);
	});
	it('not has a Arena component', () => {
		expect(components.find('.waiting').length).toEqual(1);
	});
});

describe('test in start game ', () => {
	beforeEach(() => {
		components = mount(
			<Root
				initialState={{
					auth: 'root',
					gameInfo: {
						players: ['root', 'root1'],
						hosted: 'root',
						options: {
							mode: 'single',
						},
					},
					myArena: {
						list: [
							[1, 2, 3, 4],
							[1, 2, 3, 4],
							[1, 2, 3, 4],
							[1, 2, 3, 4],
						],
						liveArena: [
							[1, 2, 3, 4],
							[1, 2, 3, 4],
							[1, 2, 3, 4],
							[1, 2, 3, 4],
						],
					},
					socket: { off: jest.fn(() => {}), on: jest.fn(() => {}) },
					startGame: true,
				}}>
				<Game />
			</Root>
		);
	});

	it('has a header', () => {
		expect(components.find(Header).length).toEqual(1);
		expect(components.find(Header).prop('type')).toEqual('home');
	});

	it('has a StartGame component', () => {
		expect(components.find(StartGame).length).toEqual(0);
	});

	it('not has a Arena component', () => {
		expect(components.find(Arena).length).toEqual(1);
	});

	it('has a Chat component', () => {
		expect(components.find(Chat).length).toEqual(1);
	});

	it('has a NextPiece component', () => {
		expect(components.find(NextPiece).length).toEqual(1);
	});
});

describe('test in end game', () => {
	beforeEach(() => {
		components = mount(
			<Root
				initialState={{
					auth: 'root',
					gameInfo: {
						players: ['root', 'root1'],
						hosted: 'root',
						messages: [],
						options: {
							mode: 'single',
						},
						stateGame: 'failed',
					},

					socket: {
						off: jest.fn(() => {}),
						on: jest.fn((param) => {
							if (param === 'room exited') window.location.href = '/';
						}),
						emit: jest.fn((param) => {
							if (param === 'exit room') window.location.href = '/';
						}),
					},
					myArena: {
						list: [
							[1, 2, 3, 4],
							[1, 2, 3, 4],
							[1, 2, 3, 4],
							[1, 2, 3, 4],
						],
						liveArena: [
							[1, 2, 3, 4],
							[1, 2, 3, 4],
							[1, 2, 3, 4],
							[1, 2, 3, 4],
						],
					},
					startGame: true,
				}}>
				<Game />
			</Root>
		);
	});

	it('has a box result', () => {
		expect(components.find(Header).length).toEqual(1);
		expect(components.find('.game-result').length).toEqual(1);
		window.location.href = '/#sel[root]';
		components.find('.game-result button').simulate('click');
		expect(window.location.hash).toEqual('');
	});
});

describe('test players === 0', () => {
	beforeEach(() => {
		components = mount(
			<Root
				initialState={{
					auth: 'root',
					gameInfo: {
						players: [],
						hosted: 'root',
						messages: [],
						options: {
							mode: 'single',
						},
					},
					myArena: {
						list: [
							[1, 2, 3, 4],
							[1, 2, 3, 4],
							[1, 2, 3, 4],
							[1, 2, 3, 4],
						],
						liveArena: [
							[1, 2, 3, 4],
							[1, 2, 3, 4],
							[1, 2, 3, 4],
							[1, 2, 3, 4],
						],
					},
					socket: { off: jest.fn(() => {}), on: jest.fn(() => {}) },
					startGame: true,
				}}>
				<Game />
			</Root>
		);
	});

	it('not has LiveGame', () => {
		expect(components.find(LiveGame).length).toEqual(0);
	});
});
