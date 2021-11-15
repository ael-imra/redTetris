import React from 'react';
import BoxSingIn from '../parts/BoxSingIn';
import Header from '../parts/Header';

const Welcome = () => {
	return (
		<div className='welcome flex flex__justify-content__space-between'>
			<Header type='notLogin' />
			<div className='welcome__left flex flex__justify-content__center flex__align-items__center'>
				<BoxSingIn />
			</div>
		</div>
	);
};

export default Welcome;
