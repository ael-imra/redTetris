import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from '../components/Button';
import Header from '../parts/Header';
import addIcons from '../assets/icons/add.png';
import listIcon from '../assets/icons/list.png';
import Input from '../components/Input';
import ListRooms from '../parts/ListRooms';
import CreateRoom from '../parts/CreateRoom';
import actions from '../store/actions';
const Home = ({ socket, listRoomsAction, auth, changeUrlAction, initGameAction, initArena, initNextPieceAction }) => {
	const [nameSearch, setNameSearch] = useState('');
	const [interval, setIntervalDestroy] = useState(null);
	const [visible, setVisible] = React.useState(false);
	React.useEffect(() => {
		socket.off('list rooms');
		socket.off('room joined');
		socket.on('list rooms', (listRoom) => {
			listRoomsAction(listRoom.data);
		});
		socket.on('room joined', (room) => {
			let gameInfo = room;
			initArena();
			initNextPieceAction();
			gameInfo.players = gameInfo.players.filter((player) => player !== auth);
			initGameAction({ ...gameInfo });
			window.location.href = `#${gameInfo.name}[${auth}]`;
			changeUrlAction(`#${gameInfo.name}[${auth}]`);
		});
		socket.emit('list rooms', nameSearch);
		if (interval) clearInterval(interval);
		setIntervalDestroy(
			setInterval(() => {
				socket.emit('list rooms', nameSearch);
			}, 2000)
		);
	}, [nameSearch]);
	return (
		<div className='home'>
			<Header type='home' />
			<div className='home__body'>
				<p className='text__debug  text__large__xl text__center'>
					<span style={{ color: 'red' }}>RED</span>TETRIS
				</p>
				<div className='home__body__actions flex flex__align-items__center flex__justify-content__space-between'>
					<div className='home__body__actions__list flex flex__align-items__center flex__justify-content__space-evenly'>
						<img src={listIcon} alt='...' />
						<p className='text__game text__lato__white text__small text__small__xxl'>List of rooms</p>
					</div>
					<Button
						size='small'
						icon={addIcons}
						type='primary'
						sizeIcon
						onclick={() => {
							setVisible(true);
						}}
					/>
				</div>
				<Input
					className='u__margin--medium__x text__lato text__lato__white  text__small text__small__xl'
					placeHolder='type your username'
					onChange={(value) => {
						setNameSearch(value);
					}}
					onEnter={() => {
						socket.emit('list rooms', nameSearch);
					}}
					defaultValue={nameSearch}
				/>
				<ListRooms />
			</div>
			<CreateRoom visible={visible} setVisible={setVisible} />
		</div>
	);
};
const mapStateToProps = (state) => {
	return {
		socket: state.socket,
		auth: state.auth,
	};
};
export default connect(mapStateToProps, {
	addNumUserInRoom: actions.addUserToRoom,
	listRoomsAction: actions.addRoom,
	changeUrlAction: actions.changePath,
	initGameAction: actions.initGame,
	initArena: actions.arenaInit,
	initNextPieceAction: actions.initNextPiece,
})(Home);
