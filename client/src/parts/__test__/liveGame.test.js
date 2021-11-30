import { shallow } from 'enzyme';
import Arena from '../../components/Arena';
import BoxHeader from '../../components/BoxHeader';
import ListUser from '../ListUser';
import LiveGame from '../LiveGame';

let components;
let user = '';
describe('test with mode !== single and players and userActive', () => {
	beforeEach(() => {
		user = '';
		components = shallow(<LiveGame gameStore={{ options: { mode: 'milt' }, players: ['player1', 'player2', 'player3'], userActive: 'player1', arenas: { player1: [1, 2] } }} />);
	});
	it('has a component', () => {
		expect(components.find(BoxHeader).length).toEqual(1);
		expect(components.find(Arena).length).toEqual(1);
		expect(components.find(ListUser).length).toEqual(1);
	});
});
describe('not has a component', () => {
	beforeEach(() => {
		user = '';
		components = shallow(<LiveGame gameStore={{ options: { mode: 'single' }, players: ['player1', 'player2', 'player3'], userActive: 'player1', arenas: { player1: [1, 2] } }} />);
	});
	it('has a header', () => {
		expect(components.find(BoxHeader).length).toEqual(0);
		expect(components.find(Arena).length).toEqual(0);
		expect(components.find(ListUser).length).toEqual(0);
	});
});
describe('test with mode === single and players and not userActive', () => {
	beforeEach(() => {
		user = '';
		components = shallow(<LiveGame gameStore={{ options: { mode: 'mult' }, players: ['player1', 'player2', 'player3'], arenas: { player1: [1, 2] } }} />);
	});
	it('not has a component', () => {
		expect(components.find(BoxHeader).length).toEqual(1);
		expect(components.find(Arena).length).toEqual(0);
		expect(components.find(ListUser).length).toEqual(0);
	});
});
