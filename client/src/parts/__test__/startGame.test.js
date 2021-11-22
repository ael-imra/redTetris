import { mount } from 'enzyme/build';
import Root from '../../Root';
import ListUser from '../ListUser';
import StartGame from '../StartGame';

let component;
let result = '';
beforeEach(() => {
	result = '';
	component = mount(
		<Root
			initialState={{
				gameInfo: {
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
