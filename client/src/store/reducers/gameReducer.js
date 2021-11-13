import * as types from '../actions/types';
export const init = (data = 0, nextPiece = false) => {
	const mapArena = new Array(parseInt(!nextPiece ? process.env.REACT_APP_HEIGHT_ARENA : process.env.REACT_APP_HEIGHT_ARENA_NEXT_PIECE));
	for (let index = 0; index < parseInt(!nextPiece ? process.env.REACT_APP_HEIGHT_ARENA : process.env.REACT_APP_HEIGHT_ARENA_NEXT_PIECE); index++) {
		mapArena[index] = new Array(parseInt(!nextPiece ? process.env.REACT_APP_WIDTH_ARENA : process.env.REACT_APP_WIDTH_ARENA_NEXT_PIECE)).fill(data);
	}
	return mapArena;
};
export const ArenaInit = (listUser) => {
	const arenas = {};
	for (let index = 0; index < listUser.length; index++) {
		arenas[listUser[index]] = init();
	}
	return arenas;
};
export const nextPieceReducer = (state = [], action) => {
	switch (action.type) {
		case types.NEXT_PIECE:
			return action.payload;
		case types.INIT_NEXT_PIECE:
			return init(0, true);
		default:
			return state;
	}
};
export const myArena = (state = [], action) => {
	switch (action.type) {
		case types.ARENA_INIT:
			return init();
		case types.NEW_ARENA:
			return action.payload;
		default:
			return state;
	}
	// not test yat
};
export const startGame = (state = false, action) => {
	switch (action.type) {
		case types.START_GAME:
			return true;
		default:
			return state;
	}
};
export const userReducer = (state = { players: [] }, action) => {

	switch (action.type) {
		case types.ADD_USER:
			return { ...state, players: [...state.players, action.payload] };
		case types.REMOVE_USER:
			return { ...state, players: state.players.filter((item) => item !== action.payload) };
		case types.USER_ACTIVE:
			return { ...state, userActive: action.payload };
		case types.ARENAS_INIT:
			return { ...state, arenas: ArenaInit(action.payload) };
		case types.INIT_GAME:
			return { ...action.payload };
		case types.INIT_GAME:
			return { ...action.payload };
		case types.STATE_GAME:
			return { ...state, stateGame: action.payload };
		default:
			return state;
	}
};
