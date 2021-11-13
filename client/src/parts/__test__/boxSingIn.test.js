import { mount } from 'enzyme/build';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Root from '../../Root';
import BoxSingIn from '../BoxSingIn';
import MockSocket from '../../__mocks__/socket';

let component;
beforeEach(() => {
	component = mount(
		<Root initialState={{ socket: MockSocket, auth: 'test' }}>
			<BoxSingIn />
		</Root>
	);
});
it('component exist', () => {
	expect(component.find(BoxSingIn).length).toEqual(1);
});

it('has a one  <Button /> component', () => {
	expect(component.find(Button).length).toEqual(1);
});

it('has a one <Input /> component', () => {
	expect(component.find(Input).length).toEqual(1);
});

it('has a one tag h2', () => {
	expect(component.find('h2').length).toEqual(1);
});
it('has tesxt error ', () => {
	expect(component.find('.box-sing-in__error').length).toEqual(1);
});

// describe('test login', () => {
// 	beforeEach(() => {
// 		component.find(Input).simulate('change', { target: { value: 'selhamr' } });
// 		component.update();
// 	});
// });
