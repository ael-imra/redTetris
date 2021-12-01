import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import iconPlay from '../assets/icons/game-boy.png';
import { connect } from 'react-redux';
import actions from '../store/actions';
import { Validator } from '../assets/utils/validator';
import { io } from 'socket.io-client';

const BoxSingIn = (props) => {
	const [username, setUsername] = useState('');
	const [errorLogin, setErrorLogin] = useState(false);
	const handleErrorLogin = () => {
		const testLogin = Validator('username', username);
		if (testLogin) {
			document.cookie = `name=${username}`;
			const socket = io(`http://${window.location.hostname}:3000`, {
				withCredentials: true,
			});
			props.socketConnect(socket);
		} else setErrorLogin(true);
	};
	return (
		<div className='box-sing-in'>
			<h2 className='text__debug  text__large__l'>
				welcome To <span style={{ color: 'red' }}>Red</span>TETRIS
			</h2>
			<p className='text__lato text__lato__white text__small text__small__xl u__margin--small__x text__center'>
				Red Tetris is multiplayer puzzle game. Join now and start playing with your friends
			</p>
			<p className='text__lato text__small text__small__l text__error box-sing-in__error' style={errorLogin ? { opacity: 1 } : { opacity: 0 }}>
				Username is Wrong must contain characters between 3 and 15
			</p>
			<Input
				className='u__margin--medium__x text__lato text__lato__white  text__small text__small__xl'
				placeHolder='type your username'
				onChange={(e) => {
					setUsername(e);
					const testLogin = Validator('username', e);
					if (testLogin && errorLogin) setErrorLogin(false);
				}}
				isError={errorLogin}
				onEnter={handleErrorLogin}
				defaultValue={username}
			/>
			<Button size='large' type='gradient' font='game' className='u__margin--large__x btn__Box-Shadow' text='Join to game' animated icon={iconPlay} onclick={handleErrorLogin} />
		</div>
	);
};

export default connect(null, { setAuth: actions.authAction, socketConnect: actions.socketConnect })(BoxSingIn);
