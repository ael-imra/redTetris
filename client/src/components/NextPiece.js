import React from 'react';
import Piece from './Piece';

const NextPiece = ({ nextPiece }) => {
	return (
		<div className='arena arena__next-piece arena__center'>
			{nextPiece.length === 0 ? '' : nextPiece.map((line, key) => line.map((item, key) => <Piece value={item} key={key} />))}
		</div>
	);
};

export default NextPiece;
