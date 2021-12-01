import React from 'react';

export const getLevel = (value) => {
	if (value === 200) return 5;
	if (value === 500) return 4;
	if (value === 1000) return 3;
	if (value === 1250) return 2;
	if (value === 1500) return 1;
	return 0;
};
export const getValue = (value) => {
	if (value === 5) return 200;
	if (value === 4) return 500;
	if (value === 3) return 1000;
	if (value === 2) return 1250;
	if (value === 1) return 1500;
	return 0;
};
const Range = ({ onChange, style = null, value = 1 }) => {
	return (
		<div className='range flex flex__align-items__center flex__justify-content__space-evenly' style={{ ...style }}>
			<input
				type='range'
				min='1'
				max='5'
				className='range'
				onChange={(e) => {
					onChange(getValue(parseInt(e.target.value)));
				}}
				value={getLevel(value)}
			/>
			<p className='text__lato text__small text__small__l text__lato__white'>{getLevel(value)}</p>
		</div>
	);
};

export default Range;
