import { shallow } from 'enzyme';
import Range from '../Range';

let component;
let valueRange = 0;

it('test with value 1000 and on change value', () => {
	component = shallow(
		<Range
			value={1000}
			onChange={(value) => {
				valueRange = value;
			}}
		/>
	);
	expect(component.find('input').length).toEqual(1);
	expect(component.find('input').prop('value')).toEqual(3);
	component.find('input').simulate('change', { target: { value: 1 } });
	expect(valueRange).toEqual(1500);
	component.find('input').simulate('change', { target: { value: 2 } });
	expect(valueRange).toEqual(1250);
	component.find('input').simulate('change', { target: { value: 3 } });
	expect(valueRange).toEqual(1000);
	component.find('input').simulate('change', { target: { value: 4 } });
	expect(valueRange).toEqual(500);
	component.find('input').simulate('change', { target: { value: 5 } });
	expect(valueRange).toEqual(200);
	component.find('input').simulate('change', { target: { value: 8 } });
	expect(valueRange).toEqual(0);
});

it('test with value 500', () => {
	component = shallow(
		<Range
			value={500}
			onChange={(value) => {
				valueRange = value;
			}}
		/>
	);
	expect(component.find('input').prop('value')).toEqual(4);
});
it('test with value 200', () => {
	component = shallow(
		<Range
			value={200}
			onChange={(value) => {
				valueRange = value;
			}}
		/>
	);
	expect(component.find('input').prop('value')).toEqual(5);
});
it('test with value 1250', () => {
	component = shallow(
		<Range
			value={1250}
			onChange={(value) => {
				valueRange = value;
			}}
		/>
	);
	expect(component.find('input').prop('value')).toEqual(2);
});
it('test with value 1500', () => {
	component = shallow(
		<Range
			value={1500}
			onChange={(value) => {
				valueRange = value;
			}}
		/>
	);
	expect(component.find('input').prop('value')).toEqual(1);
});
