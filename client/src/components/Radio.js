import React from 'react';

const Radio = ({ name, option = [], style, className, onChange, defaultValue }) => {
	return (
		<div className={`radio flex flex__align-items__center flex__justify-content__center ${className}`} style={{ ...style }}>
			{option.map((item, key) => (
				<Option
					label={item.label}
					value={item.value}
					key={key}
					id={`radio_${key}__${name}`}
					name={name}
					icon={item?.icon && item.icon ? item.icon : null}
					onChange={onChange}
					defaultValue={defaultValue}
				/>
			))}
		</div>
	);
};

export const Option = ({ label, value, id, name, icon, onChange, defaultValue }) => {
	const refBox = React.useRef(null);
	console.log(refBox);
	return (
		<div className='radio__box u__margin--small__l u__margin--small__r'>
			<input
				className='radio__box__radio'
				type='radio'
				ref={refBox}
				name={name}
				value={value}
				id={id}
				onChange={(e) => {
					onChange(e.target.value);
				}}
				checked={defaultValue === value ? true : false}
			/>
			<label
				className={`radio__box__checkbox flex flex__align-items__center flex__justify-content__center flex__direction__column ${
					refBox && refBox?.current && refBox.current.checked ? 'radio__box__checkbox__checked' : 'radio__box__checkbox__not-checked'
				}`}
				htmlFor={id}>
				{icon !== null ? <img alt='...' src={refBox && refBox?.current && refBox.current.checked ? icon.checked : icon.normal} style={{ marginBottom: 4 }} /> : ''}
				<p className='text__lato text__small text__small__l'>{label}</p>
			</label>
		</div>
	);
};

export default Radio;
