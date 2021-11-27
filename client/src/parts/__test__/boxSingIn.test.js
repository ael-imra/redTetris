import { mount } from 'enzyme/build';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Root from '../../Root';
import BoxSingIn from '../BoxSingIn';

let component;
beforeEach(() => {
	component = mount(
		<Root initialState={{ auth: 'test' }}>
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
it('has test error ', () => {
	expect(component.find('.box-sing-in__error').length).toEqual(1);
});

describe('test login', () => {
	it('bad test', () => {
		component.find(Input).simulate('change', { target: { value: '-' } });

		component.find('button').simulate('click');
		expect(component.find(Input).prop('isError')).toEqual(true);
	});
	it('god test', () => {
		component.find(Input).simulate('change', { target: { value: 'soufiane' } });
		component.find('button').simulate('click');
		expect(component.find(Input).prop('isError')).toEqual(false);
	});
	it('test change error', () => {
		component.find(Input).simulate('change', { target: { value: '-' } });
		component.find('button').simulate('click');
		component.find(Input).simulate('change', { target: { value: 'soufiane' } });
		expect(component.find(Input).prop('isError')).toEqual(false);
	});
});
