import { mount } from 'enzyme/build';
import Root from '../../Root';
import ListUser from '../ListUser';
import StartGame from '../StartGame';

let component;
let result = '';

describe('player !== 0 mode single', () => {
	beforeEach(() => {
		result = '';
		component = mount(
			<Root
				initialState={{
					game: {
						players: ['soufiane', 'hamri'],
						options: {
							mode: 'single',
						},
					},
					socket: {
						emit: jest.fn(() => {
							result = 'send';
						}),
					},
				}}>
				<StartGame />
			</Root>
		);
	});
	it('has component ListUser', () => {
		expect(component.find(ListUser).length).toEqual(1);
	});
	it('component ListUser prop mode', () => {
		expect(component.find(ListUser).prop('mode')).toEqual('single');
	});
	it('has 3 button 2 kick 1 start game', () => {
		expect(component.find('button').length).toEqual(3);
	});
	it('disabled start game', () => {
		expect(component.find('button').at(2).prop('disabled')).toEqual(false);
	});

	it(' start game click', () => {
		expect(component.find('button').at(2).simulate('click'));
		expect(result).toEqual('send');
	});
});
describe('player !== 0 mode single', () => {
	beforeEach(() => {
		result = '';
		component = mount(
			<Root
				initialState={{
					game: {
						players: [],
						options: {
							mode: 'sdddddingle',
						},
					},
					socket: {
						emit: jest.fn(() => {
							result = 'send';
						}),
					},
				}}>
				<StartGame />
			</Root>
		);
	});
	it('disabled start game', () => {
		expect(component.find('button').at(0).prop('disabled')).toEqual(true);
	});
});

describe('player ===0 mode single', () => {
	beforeEach(() => {
		result = '';
		component = mount(
			<Root
				initialState={{
					game: {
						options: {
							mode: 'single',
						},
					},
					socket: {
						emit: jest.fn(() => {
							result = 'send';
						}),
					},
				}}>
				<StartGame />
			</Root>
		);
	});
	it('has component ListUser', () => {
		expect(component.find(ListUser).length).toEqual(0);
	});
});

describe('player ===0 mode single', () => {
	beforeEach(() => {
		result = '';
		component = mount(
			<Root
				initialState={{
					game: {
						options: {
							mode: 'single',
						},
					},
					socket: {
						emit: jest.fn(() => {
							result = 'send';
						}),
					},
				}}>
				<StartGame />
			</Root>
		);
	});
	it('has component ListUser', () => {
		expect(component.find(ListUser).length).toEqual(0);
	});
});
