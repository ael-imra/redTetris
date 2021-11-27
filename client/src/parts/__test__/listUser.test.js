import { mount, shallow } from 'enzyme';
import Button from '../../components/Button';

import ListUser from '../ListUser';
import { ItemList } from '../ListUser';

let component;
let result = '';
let rlt = '';

describe('component not isBorder props and with onUserActive and onRemove', () => {
	beforeEach(() => {
		result = '';
		rlt = '';
		component = mount(
			<ListUser
				list={['name', 'test']}
				active='name'
				onUserActive={(value) => {
					result = value;
				}}
				onRemove={(value) => {
					rlt = `${value}_delete`;
				}}
			/>
		);
	});
	it('has component ItemList', () => {
		expect(component.find(ItemList).length).toEqual(2);
	});
	it('not has class list-User__border', () => {
		expect(component.find('div').at(0).hasClass('list-User__border')).toEqual(false);
	});
	it('has 2 tag p', () => {
		let test = component.find(ItemList).at(0);
		expect(test.find('p').length).toEqual(2);
		expect(test.find('p').at(0).text()).toEqual('1');
		expect(test.find('p').at(1).text()).toEqual('name');
	});
	it('has className list-User__item-active and test onUserActive', () => {
		let test = component.find(ItemList).at(0);
		expect(test.find('div').at(0).hasClass('list-User__item-active')).toEqual(true);
		test.simulate('click');
		expect(result).toEqual('name');
	});
	it('has className list-User__item', () => {
		let test = component.find(ItemList).at(1);
		expect(test.find('div').at(0).hasClass('list-User__item')).toEqual(true);
	});
	it('has button remove and onRemove', () => {
		let test = component.find(ItemList).at(0);
		expect(test.find(Button).length).toEqual(1);
		test.find(Button).simulate('click');
		expect(rlt).toEqual('name_delete');
	});
});
describe('component with isBorder props and not onUserActive and onRemove', () => {
	beforeEach(() => {
		result = '';
		rlt = '';
		component = mount(<ListUser list={['name', 'test']} active='name' isBorder='ok' />);
	});
	it('not has class list-User__border', () => {
		expect(component.find('div').at(0).hasClass('list-User__border')).toEqual(true);
	});
	it('has button remove and onRemove', () => {
		let test = component.find(ItemList).at(0);
		expect(test.find(Button).length).toEqual(0);
	});
});

describe('component  players ==0 and mode !== single', () => {
	beforeEach(() => {
		result = '';
		rlt = '';
		component = mount(<ListUser list={[]} mode='multi' />);
	});

	it('not has component ItemList', () => {
		expect(component.find(ItemList).length).toEqual(0);
	});
	it('not has component ItemList', () => {
		expect(component.find('div').at(0).find('p').length).toEqual(1);
		expect(component.find('div').at(0).find('p').text()).toEqual('waiting to join players');
	});
});
describe('component  players ==0 and mode == single', () => {
	beforeEach(() => {
		result = '';
		rlt = '';
		component = mount(<ListUser list={[]} mode='single' />);
	});

	it('not has component ItemList', () => {
		expect(component.find('div').at(0).find('p').length).toEqual(0);
	});
});
