import { shallow } from 'enzyme';
import Input from '../Input';

let component;
let onBlurValue = false;
let onKeyUpValue = false;
beforeEach(() => {
	component = shallow(
		<Input
			onBlur={(e) => {
				onBlurValue = true;
			}}
			onEnter={(e) => {
				onKeyUpValue = true;
			}}
		/>
	);
});


it('test onKeyUp with code 13', () => {
	component.simulate('KeyUp', { keyCode: 13 });
	expect(onKeyUpValue).toEqual(true);
});

it('test onKeyUp with code 14', () => {
	onKeyUpValue = false;
	component.simulate('KeyUp', { keyCode: 14 });
	expect(onKeyUpValue).toEqual(false);
});
