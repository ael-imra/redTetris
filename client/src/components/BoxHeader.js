import React from 'react';

const BoxHeader = ({ text, isBorder }) => {
	return (
		<div className={`game__Box-header flex flex__align-items__center ${isBorder ? 'game__Box-header__border' : ''}`}>
			<p className='text__game text__lato__white text__small text__medium u__margin--medium__l'>{text}</p>
		</div>
	);
};

export default BoxHeader;
//
