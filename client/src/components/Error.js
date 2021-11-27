import React from 'react';
import { connect } from 'react-redux';
import imageClose from '../assets/images/error.png';
import Header from '../parts/Header';

const Error = ({ error, closeErrorAction }) => {
	return (
		<div className={`error ${error.state ? 'error__active' : ''}`}>
			<div className='error__message'>
				<img src={imageClose} alt='...' />
				<div className='flex flex__direction__column'>
					<p className='text__game text__small__xxl text__game__letter-spacing__small text__game__white'>Error</p>
					<p className='text__lato text__small text__small__l'>{error.content}</p>
				</div>
			</div>

			<div
				className='error__close'
				onClick={() => {
					closeErrorAction();
				}}>
				<p className='text__game text__small__l text__game__letter-spacing__small text__game__white'>close</p>
			</div>
		</div>
	);
};

export default Error;
