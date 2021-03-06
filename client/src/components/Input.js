import React, { useRef } from 'react';

const Input = (props) => {
	const refInput = useRef(null);
	const className = `input ${props.className || ''} ${props.isError ? 'input__error' : ''} ${
		props.color === 'white' ? 'input__white' : props.color === 'blackFocus' ? 'input__blackFocus' : 'input__black'
	} ${props.size === 'small' ? 'input__small' : 'input__large'}`;
	return (
		<input
			ref={refInput}
			className={className}
			onChange={(e) => {
				props.onChange(e.target.value);
			}}
			value={props?.defaultValue ? props.defaultValue : ''}
			placeholder={props?.placeHolder ? props.placeHolder : ''}
			style={props?.style ? props.style : {}}
			onKeyUp={(e) => {
				if (e.keyCode === 13 && props?.onEnter) props.onEnter();
			}}
		/>
	);
};

export default Input;
