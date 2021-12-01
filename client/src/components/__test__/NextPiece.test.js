import { shallow } from 'enzyme';
import NextPiece from '../NextPiece';
import Piece from '../Piece';

let component;

it('tst', () => {
	component = shallow(
		<NextPiece
			nextPiece={[
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0],
			]}
		/>
	);
	expect(component.find(Piece).length).toEqual(25);
});
it('tst', () => {
	component = shallow(<NextPiece nextPiece={[]} />);
	expect(component.find(Piece).length).toEqual(0);
});
