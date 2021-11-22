import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { listRooms } from './roomReducer';
import { urlReducer } from './urlReducer';
import { socket } from './socketReducer';
import { errorState } from './errorReducer';
import { myArena, userReducer, nextPieceReducer, startGame } from './gameReducer';

export default combineReducers({
	auth: authReducer,
	url: urlReducer,
	rooms: listRooms,
	myArena: myArena,
	gameInfo: userReducer,
	nextPiece: nextPieceReducer,
	startGame: startGame,
	socket: socket,
	error: errorState,
});
