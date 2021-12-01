import { mount, shallow } from 'enzyme/build';
import Welcome from '../../pages/Welcome';
import Root from '../../Root';
import App from '../App';

let component;
let visible;
describe('has error', () => {
	beforeEach(() => {
		visible = true;
		component = mount(
			<Root
				initialState={{
					auth: false,
				}}>
				<App />
			</Root>
		);
	});

	it('test class Error', () => {
		expect(component.find(Welcome).length).toEqual(1);
	});
});
