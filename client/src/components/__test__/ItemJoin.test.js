import { mount } from 'enzyme/build';
import Root from '../../Root';
import ItemJoin from '../ItemJoin';

let component;
beforeEach(() => {
	component = mount(
		<Root>
			<ItemJoin />
		</Root>
	);
});

it('test div container', () => {
    expect(component.find('div').length).toEqual(1);
});