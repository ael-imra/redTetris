import { shallow } from 'enzyme/build';
import Arena from '../Arena';
import Piece from '../Piece';

let component;

describe('init arena', () => {
	beforeEach(() => {
		component = shallow(
			<Arena
				data={[
					[0, 0, 0, 0],
					[0, 0, 0, 0],
					[0, 0, 0, 0],
					[0, 0, 0, 0],
				]}
			/>
		);
	});
	it('test all piece value zero', () => {
		component.find(Piece).forEach((node) => {
			expect(node.prop('value')).toEqual(0);
		});
	});
});
