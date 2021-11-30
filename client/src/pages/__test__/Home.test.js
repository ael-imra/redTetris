import { mount, shallow } from 'enzyme';
import Button from '../../components/Button';
import Input from '../../components/Input';
import CreateRoom from '../../parts/CreateRoom';
import Header from '../../parts/Header';
import ListRooms from '../../parts/ListRooms';
import Root from '../../Root';
import Home from '../Home';
let components;
let test = '';
describe('it', () => {
	beforeEach(() => {
		components = mount(
			<Root
				initialState={{
					auth: 'selhamr',
					game: {
						name: 'soufiane',
					},
					socket: {
						emit: () => {
							test = 'ko';
						},
					},
				}}>
				<Home />
			</Root>
		);
	});
	it('has a <Header /> component', () => {
		expect(components.find(Header).length).toEqual(1);
		expect(components.find(Header).prop('type')).toEqual('home');
	});

	it('has a <Input /> component', () => {
		expect(components.find(Input).length).toEqual(1);
	});

	it('has a <ListRooms /> component', () => {
		expect(components.find(ListRooms).length).toEqual(1);
	});

	it('has a <CreateRoom /> component', () => {
		expect(components.find(CreateRoom).length).toEqual(1);
	});

	it('has a <Button /> component', () => {
		expect(components.find(Button).length).toEqual(2);
	});

	it('has a <Header /> component and test type is home', () => {
		expect(components.find(Header).prop('type')).toEqual('home');
	});

	it('has click state visible', () => {
		expect(components.find(CreateRoom).prop('visible')).toEqual(false);
		components
			.find(Button)
			.at(1)
			.simulate('click', { target: { value: 'width' } });
		expect(components.find(CreateRoom).prop('visible')).toEqual(true);
	});

	it('has change  state  input', () => {
		expect(components.find(Input).prop('defaultValue')).toEqual('');
		components.find(Input).simulate('change', { target: { value: 'width' } });
		expect(components.find(Input).prop('defaultValue')).toEqual('width');
		components.find(Input).simulate('keyup', { keyCode: 13 });
	});
	it('emit function', () => {
		expect(test).toEqual('ko');
	});
});
describe('ssss', () => {
	beforeEach(() => {
		test = '';
		components = mount(
			<Root
				initialState={{
					auth: 'selhamr',
					game: {},
					socket: {
						emit: () => {
							test = 'ko';
						},
					},
				}}>
				<Home />
			</Root>
		);
	});
	it('emit function', () => {
		expect(test).toEqual('');
	});
});
