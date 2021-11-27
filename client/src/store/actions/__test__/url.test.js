import { changePath } from '../url';
import * as types from '../types';

it('has the correct type', () => {
	const actionCreator = changePath('/sel-hamr');
	expect(actionCreator.type).toEqual(types.URL_CHANGE);
});
it('has the correct payload', () => {
	const actionCreator = changePath('/sel-hamr');
	expect(actionCreator.payload).toEqual('/sel-hamr');
});

it('has the correct payload', () => {
	const actionCreator = changePath();
	expect(actionCreator.payload).toEqual('/');
});
