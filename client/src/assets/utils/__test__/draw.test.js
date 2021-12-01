import { draw } from '../draw';

let wrapper;

it('test with god param', () => {
	wrapper = draw(
		{
			map: [
				{ x: 0, y: 0 },
				{ x: 1, y: 1 },
			],
		},
		[
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		]
	);
	expect(wrapper[0][0]).toEqual(1);
});
it('test with bad x param', () => {
	wrapper = draw(
		{
			map: [{ x: 11, y: 2 }],
		},
		[
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		]
	);
	wrapper[2].forEach((element) => {
		expect(element).toEqual(0);
	});
});

it('test with bad x param', () => {
	wrapper = draw(
		{
			test: [
				{ x: 0, y: 0 },
				{ x: 1, y: 1 },
			],
		},
		[
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		]
	);
	expect(wrapper[0][0]).toEqual(0);
});
