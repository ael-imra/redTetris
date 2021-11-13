import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { addMessage } from './messageReducer';
import { listRooms } from './roomReducer';
import { urlReducer } from './urlReducer';
import { socket } from './socketReducer';
import { myArena, userReducer, nextPieceReducer, startGame } from './gameReducer';

export default combineReducers({
	auth: authReducer,
	url: urlReducer,
	listRooms: listRooms,
	addMessage: addMessage,
	myArena: myArena,
	gameInfo: userReducer,
	nextPiece: nextPieceReducer,
	startGame: startGame,
	socket: socket,
});
// options:
// maxPlayers: 10
// mode: "single"
// privacy: "public"
// speed: 1000