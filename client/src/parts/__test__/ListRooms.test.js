import { mount } from 'enzyme/build';
import ItemJoin from '../../components/ItemJoin';
import Root from '../../Root';
// import * as MushSocket from '../../__mocks__/socket';
import ListRooms from '../ListRooms';

let component;

beforeEach(() => {
	component = mount(
		<Root
			initialState={{
				socket: {
					emit: () => {
						window.location.href = '/#A1[sel-hamr]';
					},
				},
				rooms: {
					list: [
						{ name: 'A1', maxPlayer: 10, type: 'multiple', countPlayer: 7 },
						{ name: 'B2', maxPlayer: 9, type: 'multiple', countPlayer: 6 },
						{ name: 'C3', maxPlayer: 8, type: 'multiple', countPlayer: 5 },
						{ name: 'C4', maxPlayer: 7, type: 'multiple', countPlayer: 4 },
					],
				},
			}}>
			<ListRooms />
		</Root>
	);
});

it('test length list rooms', () => {
	expect(component.find(ItemJoin).length).toEqual(4);
});

it('test first item in listRooms', () => {
	expect(component.find(ItemJoin).at(0).prop('text')).toEqual('A1');
	expect(component.find(ItemJoin).at(0).prop('range')).toEqual(10);
	expect(component.find(ItemJoin).at(0).prop('type')).toEqual('multiple');
	expect(component.find(ItemJoin).at(0).prop('num')).toEqual(7);
	expect(window.location.hash).toEqual('');
	component.find(ItemJoin).find('button').at(0).simulate('click');
	expect(window.location.hash).toEqual('#A1[sel-hamr]');
});

it('test last item in listRooms', () => {
	expect(component.find(ItemJoin).at(3).prop('text')).toEqual('C4');
	expect(component.find(ItemJoin).at(3).prop('range')).toEqual(7);
	expect(component.find(ItemJoin).at(3).prop('type')).toEqual('multiple');
	expect(component.find(ItemJoin).at(3).prop('num')).toEqual(4);
});
