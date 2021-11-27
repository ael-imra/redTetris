import { mount } from 'enzyme/build';
import Root from '../../Root';
import Button from '../Button';
import Chat from '../Chat';
import Input from '../Input';

let component;
let result = '';
beforeEach(() => {
	result = '';
	component = mount(
		<Root
			initialState={{
				game: {
					messages: [
						{ name: 'soufiane', message: 'test' },
						{ name: 'hamri', message: 'test}' },
					],
				},
				socket: {
					emit: jest.fn(() => {
						result = 'send';
					}),
				},
			}}>
			<Chat />
		</Root>
	);
});
it('length list message', () => {
	expect(component.find('p').length).toEqual(2);
});
it('seed message ', () => {
	component.find(Input).simulate('change', { target: { value: 'hi dad' } });
	component.find(Button).simulate('click');
	expect(result).toEqual('send');
});

it('seed message empty', () => {
	component.find(Input).simulate('change', { target: { value: '' } });
	component.find(Button).simulate('click');
	expect(result).toEqual('');
});
