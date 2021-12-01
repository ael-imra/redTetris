import React from 'react';
import logo from '../assets/icons/icon.png';

const Logo = () => {
  return (
    <div className='logo u__margin--auto__x--only-r'>
      <img src={logo} alt='...' className='logo__img' />
      <p className='text__debug logo__text'>
        <span style={{ color: 'red' }}>Red</span>TETRIS
      </p>
    </div>
  );
};

export default Logo;
