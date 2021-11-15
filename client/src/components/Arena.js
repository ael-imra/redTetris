import React from 'react';
import Piece from './Piece';

const Arena = ({ size, centerAlign, className = '', data, onKeyDown, refArena = null }) => {
	return (
		<div
			className={`arena ${size === 'small' ? 'arena__small' : 'arena__large'} ${centerAlign ? 'arena__center' : ''} ${className}`}
			tabIndex='1'
			onKeyDown={(e) => onKeyDown(e)}
			ref={refArena}>
			{data.map((line, key) => line.map((item, key) => <Piece value={item} key={key} isBorder />))}
		</div>
	);
};

export default Arena;
