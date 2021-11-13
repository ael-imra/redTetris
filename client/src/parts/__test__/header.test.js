import { mount } from 'enzyme/build';
import Button from '../../components/Button';
import Logo from '../../components/Logo';
import Root from '../../Root';
import Header from '../Header';

describe('testing header not login', () => {
	let component;
	beforeEach(() => {
		component = mount(
			<Root>
				<Header type='notLogin' />
			</Root>
		);
	});
	it('has Logo component', () => {
		expect(component.find(Logo).length).toEqual(1);
		expect(component.find(Button).length).toEqual(0);
	});
});

describe('testing header  login', () => {
	let component;
	beforeEach(() => {
		component = mount(
			<Root initialState={{ auth: 'text' }}>
				<Header />
			</Root>
		);
	});
	it('has Logo component', () => {
		expect(component.find(Logo).length).toEqual(1);
		expect(component.find('.header p').at(1).text()).toEqual('text');
	});
});
