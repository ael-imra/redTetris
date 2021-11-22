import { mount } from 'enzyme/build';
import Root from '../../Root';
import ListUser from '../ListUser';
import { ItemList } from '../ListUser';

let component;
let result = '';
beforeEach(() => {
	result = '';
	component = mount(<ListUser list={['name', 'test']} active='name' />);
});
it('has component ListUser', () => {
	expect(component.find(ItemList).length).toEqual(2);
});
