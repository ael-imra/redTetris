import React from 'react';
import Button from './Button';

const ItemJoin = ({ text, range, num, onclick, type }) => {
	return (
		<div className='item-join u__margin--medium__x flex flex__align-items__center flex__justify-content__space-between u__padding--medium__l u__padding--medium__r '>
			<p className='text__game text__lato__white text__small text__small__xxl'>{text}</p>
			<p className='text__game text__lato__white text__small text__small__xxl'>{type === 'single' ? 'single' : `${num}/${range}`}</p>
			<Button size='small' type='primary' text='join' style={{ padding: '0.8rem 2rem', fontFamily: 'game' }} onclick={onclick} />
		</div>
	);
};

export default ItemJoin;
