import React, { useState } from 'react';
import { connect } from 'react-redux';
import actions from '../store/actions/';
import * as shapes from '../assets/utils/shapes';
import { draw } from '../assets/utils/draw';
import { init } from '../store/reducers/gameReducer';
import { Validator } from '../assets/utils/validator';
import { io } from 'socket.io-client';
const SocketMiddle = (props) => {
	const [interval, setIntervalDestroy] = useState(null);
	const resetNext = init(0, true);
	React.useEffect(() => {
		if (Validator('urlRoom', window.location.hash) && !props.socket) {
			const hash = window.location.hash.slice(1, window.location.hash.length - 1);
			let roomName = hash.split('[')[0];
			let username = hash.split('[')[1];
			document.cookie = `name=${username}`;
			const socket = io(`http://${window.location.hostname}:3000`, {
				withCredentials: true,
			});
			socket.emit('join room', roomName);
			props.socketConnect(socket);
		} else props.setAuth(false);
		// eslint-disable-next-line
	}, []);
	React.useEffect(() => {
		if (props.socket) {
			props.socket.on('connected', (player) => {
				props.authAction(player.name);
			});
			props.socket.on('handle error', (error) => {
				props.handleErrorAction(error);
			});
			props.socket.on('game paused', () => {
				props.pauseGameAction();
			});
			props.socket.on('room exited', () => {
				window.location.href = '/#';
				props.changeUrlAction('/');
				props.resetGameAction();
			});
			props.socket.on('list rooms', (listRoom) => {
				props.listRoomsAction(listRoom.data);
			});
			props.socket.on('player exit', (name) => {
				props.removeUserAction(name);
			});
			props.socket.on('game restarted', () => {
				props.initArena();
				props.initNextPieceAction();
				props.liveArenaInitAction();
			});
			props.socket.on('game started', () => {
				props.startGameAction();
			});
			props.socket.on('player joined', (player) => {
				props.addUserInRoomAction(player.name);
			});
		}
		// eslint-disable-next-line
	}, [props.socket]);

	React.useEffect(() => {
		if (props.socket && !props.gameStore.name) {
			props.socket.emit('list rooms', props.rooms.nameSearch);
			if (interval) clearInterval(interval);
			setIntervalDestroy(
				setInterval(() => {
					if (!props.gameStore.name) props.socket.emit('list rooms', props.rooms.nameSearch);
				}, 2000)
			);
		}
		// eslint-disable-next-line
	}, [props.rooms, props.socket]);

	React.useEffect(() => {
		if (props.socket) {
			props.socket.off('piece moved');
			props.socket.off('piece completed');
			props.socket.on('piece completed', (info) => {
				if (info.player === props.auth) {
					props.nextPieceAction(draw(shapes[info.nextPiecePiece](2, 2), resetNext));
					props.newArenaAction(info.field);
					props.liveArenaAction(info.field);
					props.newScoreAction(info.score);
					props.StateGameActon(!info.failed && !info.win ? 'waiting' : info.win ? 'winner' : 'failed');
				} else {
					props.newArenasAction(info.field, info.player);
				}
			});
			props.socket.on('piece moved', (info) => {
				if (info.player === props.auth) {
					const newShape = shapes[info.shape](...info.point);
					let test = draw(newShape, JSON.parse(JSON.stringify(props.gameStore.arenaTmp)), info.color);
					const shadow = shapes[info.shape](info.point[0], info.shadow);
					props.liveArenaAction(draw(shadow, test, 7));
				}
			});
		}
		// eslint-disable-next-line
	}, [props.gameStore, props.socket]);

	React.useEffect(() => {
		if (props.socket) {
			props.socket.off('message');
			props.socket.on('message', (message) => {
				props.addMessageAction(message.message, message.name);
				setTimeout((props.gameStore.refBoxChat.current.scrollTop = props.gameStore.refBoxChat.current.scrollHeight), 0);
			});
		}
		// eslint-disable-next-line
	}, [props.socket, props.gameStore]);

	React.useEffect(() => {
		if (props.socket) {
			props.socket.off('room joined');
			props.socket.on('room joined', (room) => {
				let gameInfo = room;
				gameInfo.players = gameInfo.players.filter((player) => player !== props.auth);
				props.initGameAction({ ...gameInfo });
				window.location.href = `#${gameInfo.name}[${props.auth}]`;
				props.changeUrlAction(`#${gameInfo.name}[${props.auth}]`);
			});
		}
		// eslint-disable-next-line
	}, [props.socket, props.auth]);
	return props.children;
};
const matStateToProps = (state) => {
	return {
		gameStore: state.game,
		socket: state.socket,
		auth: state.auth,
		rooms: state.rooms,
	};
};
export default connect(matStateToProps, {
	authAction: actions.authAction,
	handleErrorAction: actions.errorActive,
	addUserInRoomAction: actions.listUser,
	changeUrlAction: actions.changePath,
	startGameAction: actions.startGame,
	newArenaAction: actions.newArena,
	StateGameActon: actions.stateGame,
	nextPieceAction: actions.nextPiece,
	newScoreAction: actions.newScore,
	newArenasAction: actions.newArenas,
	addMessageAction: actions.addMessage,
	resetGameAction: actions.ResetGame,
	pauseGameAction: actions.pauseGame,
	listRoomsAction: actions.addRoom,
	initGameAction: actions.initGame,
	initArena: actions.arenaInit,
	initNextPieceAction: actions.initNextPiece,
	liveArenaAction: actions.liveArena,
	liveArenaInitAction: actions.liveArenaInit,
	removeUserAction: actions.removeUser,
	setAuth: actions.authAction,
	socketConnect: actions.socketConnect,
})(SocketMiddle);
