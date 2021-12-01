import { shallow } from 'enzyme';
import { mount } from 'enzyme/build';
import Root from '../../Root';
import Error from '../Error';

let component;
let visible;
describe('has error', () => {
	beforeEach(() => {
		visible = true;
		component = mount(
			<Error
				error={{
					state: visible,
					content: 'hi am soufiane',
				}}
				closeErrorAction={() => {
					visible = false;
				}}
			/>
		);
	});

	it('test class Error', () => {
		expect(component.find('.error').hasClass('error__active')).toEqual(true);
	});

	it('has button close', () => {
		expect(component.find('.error__close').length).toEqual(1);
		component.find('.error__close').simulate('click');
		expect(visible).toEqual(false);
	});
});

describe('has error', () => {
	beforeEach(() => {
		visible = false;
		component = mount(
			<Error
				error={{
					state: visible,
				}}
			/>
		);
	});
	it('test class Error', () => {
		expect(component.find('.error').hasClass('error__active')).toEqual(false);
	});
});
