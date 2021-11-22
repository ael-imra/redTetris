import React from 'react';
import Button from '../components/Button';

export const ItemList = ({ index, value, active, onUserActive, onRemove }) => (
	<div
		className={`flex flex__align-items__center ${active === value ? 'list-User__item-active' : 'list-User__item'} `}
		onClick={() => {
			onUserActive(value);
		}}>
		<div className='item-num flex flex__align-items__center flex__justify-content__center'>
			<p className='text__lato text__small text__small__s'>{index}</p>
		</div>
		<p className='text__lato text__lato__white text__small text__small__l test'>{value}</p>
		{onRemove ? (
			<Button
				size='small'
				text='kick'
				style={{ padding: '0.5rem 1.5rem' }}
				onclick={() => {
					onRemove(value);
				}}
			/>
		) : (
			''
		)}
	</div>
);
const ListUser = ({ list, active, onUserActive = () => {}, isBorder, onRemove = null, button = null, mode }) => {
	return (
		<div className={`list-User ${isBorder ? 'list-User__border' : ''}`}>
			{list.length !== 0 ? (
				list.map((item, key) => <ItemList index={key + 1} value={item} key={key} active={active} onUserActive={onUserActive} onRemove={onRemove} />)
			) : mode !== 'single' ? (
				<p className='text__game text__lato__white text__medium text__center text__game__word-spacing__large'>waiting to join players</p>
			) : (
				''
			)}
			{button ? <Button {...button} /> : ''}
		</div>
	);
};

export default ListUser;
