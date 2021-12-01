import React from 'react';

const Piece = ({ value, isBorder }) => {
	return <div className={`tile ${isBorder ? 'tile__border' : ''} ${value !== 0 ? `tile__color-${value}` : ''}`}></div>;
};

export default Piece;
