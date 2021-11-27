import { mount } from 'enzyme';
import BoxSingIn from '../../parts/BoxSingIn';
import Header from '../../parts/Header';
import Root from '../../Root';
import Welcome from '../Welcome';
let components;
beforeEach(() => {
  components = mount(
    <Root>
      <Welcome />
    </Root>
  );
});
it('has a <Header /> component', () => {
  expect(components.find(Header).length).toEqual(1);
});
it('has a <BoxSingIn /> component', () => {
  expect(components.find(BoxSingIn).length).toEqual(1);
});
it('has a welcome className component', () => {
  expect(components.find(Welcome).find('.welcome').length).toEqual(1);
});

