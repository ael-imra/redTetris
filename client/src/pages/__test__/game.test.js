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
					game: {
						players: ['root', 'root1'],
						hosted: 'root',
						messages: [],
						options: {
							mode: 'single',
						},
						startGame: false,
						liveArena: [
							[1, 2, 3, 4],
							[1, 2, 3, 4],
							[1, 2, 3, 4],
							[1, 2, 3, 4],
						],
						arenaTmp: [
							[1, 2, 3, 4],
							[1, 2, 3, 4],
							[1, 2, 3, 4],
							[1, 2, 3, 4],
						],
						nextPiece: [
							[1, 2, 3, 4],
							[1, 2, 3, 4],
							[1, 2, 3, 4],
							[1, 2, 3, 4],
						],
					},
					socket: { off: jest.fn(() => {}) },
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
					auth: 'noroot',
					game: {
						players: ['root', 'root1'],
						hosted: 'root',
						messages: [],
						options: {
							mode: 'single',
						},
						startGame: false,
						liveArena: [
							[1, 2, 3, 4],
							[1, 2, 3, 4],
							[1, 2, 3, 4],
							[1, 2, 3, 4],
						],
						arenaTmp: [
							[1, 2, 3, 4],
							[1, 2, 3, 4],
							[1, 2, 3, 4],
							[1, 2, 3, 4],
						],
						nextPiece: [
							[1, 2, 3, 4],
							[1, 2, 3, 4],
							[1, 2, 3, 4],
							[1, 2, 3, 4],
						],
					},
					socket: { off: jest.fn(() => {}) },
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
					game: {
						players: ['root', 'root1'],
						hosted: 'root',
						messages: [],
						options: {
							mode: 'single',
						},
						startGame: true,
						liveArena: [
							[1, 2, 3, 4],
							[1, 2, 3, 4],
							[1, 2, 3, 4],
							[1, 2, 3, 4],
						],
						arenaTmp: [
							[1, 2, 3, 4],
							[1, 2, 3, 4],
							[1, 2, 3, 4],
							[1, 2, 3, 4],
						],
						nextPiece: [
							[1, 2, 3, 4],
							[1, 2, 3, 4],
							[1, 2, 3, 4],
							[1, 2, 3, 4],
						],
					},
					socket: { off: jest.fn(() => {}) },
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


describe('test players === 0', () => {
	beforeEach(() => {
		components = mount(
			<Root
				initialState={{
					auth: 'root',
					game: {
						players: [],
						hosted: 'root',
						messages: [],
						options: {
							mode: 'single',
						},
						stateGame: 'failed',
						startGame: true,
						liveArena: [
							[1, 2, 3, 4],
							[1, 2, 3, 4],
							[1, 2, 3, 4],
							[1, 2, 3, 4],
						],
						arenaTmp: [
							[1, 2, 3, 4],
							[1, 2, 3, 4],
							[1, 2, 3, 4],
							[1, 2, 3, 4],
						],
						nextPiece: [
							[1, 2, 3, 4],
							[1, 2, 3, 4],
							[1, 2, 3, 4],
							[1, 2, 3, 4],
						],
					},
					socket: { off: jest.fn(() => {}), emit: jest.fn(() => {}) },
				}}>
				<Game />
			</Root>
		);
	});

	it('not has LiveGame', () => {
		expect(components.find(LiveGame).length).toEqual(0);
	});
});
