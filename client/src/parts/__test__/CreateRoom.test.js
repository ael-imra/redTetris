import { mount } from 'enzyme/build';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Radio from '../../components/Radio';
import Root from '../../Root';
import CreateRoom from '../CreateRoom';
let component;
let visible = true;

let testSocket;
beforeEach(() => {
	component = mount(
		<Root
			initialState={{
				auth: 'selhamr',
				socket: {
					emit: jest.fn((param, param1, param2) => {
						if (param === 'create room') testSocket = `${param1}-${param2.maxPlayers}-${param2.mode}`;
					}),
				},
			}}>
			<CreateRoom visible={true} setVisible={() => (visible = !visible)} />
		</Root>
	);
	testSocket = '';
});


it('test change data create room', () => {
	component
		.find(Input)
		.at(0)
		.simulate('change', { target: { value: 'root' } });

	component
		.find('.radio__box__radio')
		.at(0)
		.simulate('change', { target: { value: 'multi' } });
	component
		.find('.radio__box__radio')
		.at(3)
		.simulate('change', { target: { value: 'public' } });

	component
		.find(Input)
		.at(1)
		.simulate('change', { target: { value: '10' } });
	expect(component.find(Radio).at(0).prop('defaultValue')).toEqual('multi');
	expect(component.find(Radio).at(1).prop('defaultValue')).toEqual('public');
	expect(component.find(Input).at(0).prop('defaultValue')).toEqual('root');
	expect(component.find(Input).at(1).prop('defaultValue')).toEqual('10');
	expect(testSocket).toEqual('');
	component.find('.btn-create').at(1).simulate('click');
	expect(testSocket).toEqual('root-10-multi');
});

it('test change bad data create room', () => {
	component
		.find(Input)
		.at(0)
		.simulate('change', { target: { value: 2 } });
	component.find(Button).simulate('click');
	expect(component.find(Input).at(0).prop('isError')).toEqual(true);
});
