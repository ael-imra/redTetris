import { mount, shallow } from 'enzyme';
import Input from '../../components/Input';
import Radio from '../../components/Radio';
import Range from '../../components/Range';
import Settings from '../Settings';

let components;

describe('test setting with mode single', () => {
	beforeEach(() => {
		components = shallow(<Settings info={{ speed: 1250, privacy: 'private', maxPlayers: 0, mode: 'single' }} />);
	});
	it('not has Input', () => {
		expect(components.find(Input).length).toEqual(0);
	});
	it('has Range', () => {
		expect(components.find(Range).length).toEqual(1);
		expect(components.find(Range).prop('value')).toEqual(1250);
		components.find(Range).simulate('change', 1500);
		expect(components.find(Range).prop('value')).toEqual(1500);
	});
	it('has Radio', () => {
		expect(components.find(Radio).length).toEqual(2);
		components.find(Radio).at(0).simulate('change', 'multi');
		expect(components.find(Input).length).toEqual(1);
		components.find(Radio).at(1).simulate('change', 'private');
		expect(components.find(Radio).at(1).prop('defaultValue')).toEqual('private');
	});
});
describe('test setting with mode single', () => {
	beforeEach(() => {
		components = shallow(<Settings info={{ speed: 1250, privacy: 'private', maxPlayers: 0, mode: 'multi' }} />);
	});
	it('has Input', () => {
		expect(components.find(Input).length).toEqual(1);
		components.find(Input).simulate('change', 'name');
		expect(components.find(Input).prop('defaultValue')).toEqual('name');
	});
});
