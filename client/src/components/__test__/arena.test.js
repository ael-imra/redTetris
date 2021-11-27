import { shallow } from 'enzyme/build';
import Arena from '../Arena';
import Piece from '../Piece';

let component;
let onKeyDownValue = '';

describe('arena component test init and onKeyDown', () => {
	beforeEach(() => {
		component = shallow(
			<Arena
				data={[
					[0, 0, 0, 0],
					[0, 0, 0, 0],
					[0, 0, 0, 0],
					[0, 0, 0, 0],
				]}
				onKeyDown={(e) => {
					onKeyDownValue = e;
				}}
			/>
		);
	});
	it('test all piece value zero', () => {
		component.find(Piece).forEach((node) => {
			expect(node.prop('value')).toEqual(0);
		});
	});

	it('test onKeyDown', () => {
		component.simulate('keyDown', 52);
		expect(onKeyDownValue).toEqual(52);
	});

	it('test size props', () => {
		expect(component.hasClass('arena__large')).toEqual(true);
	});

	it('test centerAlign', () => {
		expect(component.hasClass('arena__center')).toEqual(false);
	});

});
describe('arena component with size and centerAlign props', () => {
	beforeEach(() => {
		component = shallow(
			<Arena
				data={[
					[0, 0, 0, 0],
					[0, 0, 0, 0],
					[0, 0, 0, 0],
					[0, 0, 0, 0],
				]}
				centerAlign
				size='small'
			/>
		);
	});
	it('test size', () => {
		expect(component.hasClass('arena__small')).toEqual(true);
	});
	it('test centerAlign', () => {
		expect(component.hasClass('arena__center')).toEqual(true);
	});
});
