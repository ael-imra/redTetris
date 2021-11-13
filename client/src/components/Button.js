import React from 'react';

const Button = ({ type, text, animated, size, className, icon, onclick, sizeIcon, style = {}, disabled = false, font = 'lato' }) => {
	const classNameI = `btn ${font === 'lato' ? 'text__lato' : 'text__game'} ${
		type === 'primary' ? 'btn--primary' : type === 'border' ? 'btn--border' : type === 'gradient' ? 'btn--gradient' : 'btn--danger'
	} ${size === 'small' ? 'text_small__l' : size === 'large' ? (font === 'game' ? 'text__small__xxl' : 'text__small__xl') : 'text__small__xl'} ${animated ? 'btn__animated' : ''} ${
		className || ''
	} btn__${size}`;
	const iconImg = () => {
		return <img src={icon} alt='...' className={`${!sizeIcon ? 'btn__icon' : 'btn__icon__large'} `} style={{ marginRight: text ? 15 : 0 }} />;
	};
	return (
		<button className={classNameI} onClick={(e) => onclick(e)} style={{ ...style }} disabled={disabled}>
			{icon ? iconImg() : ''}
			{text}
		</button>
	);
};

export default Button;
