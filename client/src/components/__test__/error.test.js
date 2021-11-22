import { mount, shallow } from 'enzyme/build';
import Root from '../../Root';
import Err from '../Error';

let component;
let visible;
describe('has error', () => {
	beforeEach(() => {
		visible = true;
		component = mount(
			<Root
				initialState={{
					error: {
						state: visible,
						content: 'hi am soufiane',
					},
				}}>
				<Err
					closeErrorAction={() => {
						console.log('poi');
					}}
				/>
			</Root>
		);
	});

	it('test class Error', () => {
		expect(component.find('.error').hasClass('error__active')).toEqual(true);
	});

	it('has button close', () => {
		expect(component.find('.error__close').length).toEqual(1);
	});
});

describe('has error', () => {
	beforeEach(() => {
		visible = false;
		component = mount(
			<Root
				initialState={{
					error: {
						state: visible,
					},
				}}>
				<Err />
			</Root>
		);
	});
	it('test class Error', () => {
		expect(component.find('.error').hasClass('error__active')).toEqual(false);
	});
});
