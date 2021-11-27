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
export const gameReducer = (state = { players: [], score: 0, messages: [] }, action) => {
	switch (action.type) {
		case types.ADD_USER:
			return { ...state, players: [...state.players, action.payload] };
		case types.REMOVE_USER:
			return { ...state, players: state.players.filter((item) => item !== action.payload) };
		case types.USER_ACTIVE:
			return { ...state, userActive: action.payload };
		case types.ARENAS_INIT:
			return { ...state, arenas: ArenaInit(action.payload) };
		case types.NEW_ARENAS:
			let newArenas = state.arenas;
			newArenas[action.payload.user] = action.payload.newArena;
			return { ...state, arenas: { ...newArenas } };
		case types.INIT_GAME:
			return { ...action.payload, nextPiece: init(0, true), arenaTmp: init(), liveArena: init(), score: 0 };
		case types.STATE_GAME:
			return { ...state, stateGame: action.payload };
		case types.NEW_SCORE:
			return { ...state, score: action.payload };
		case types.ADD_MESSAGE:
			return { ...state, messages: [...state.messages, { name: action.payload.name, message: action.payload.message }] };
		case types.ADD_REFERENCE_BOX:
			return { ...state, refBoxChat: action.payload };
		case types.RESET_GAME:
			return {};
		case types.PAUSE_GAME:
			return { ...state, pause: state.pause ? false : true };
		case types.START_GAME:
			return { ...state, startGame: true };
		case types.ARENA_INIT:
			return { ...state, arenaTmp: init() };
		case types.NEW_ARENA:
			return { ...state, arenaTmp: action.payload };
		case types.LIVE_ARENA:
			return { ...state, liveArena: action.payload };
		case types.LIVE_ARENA_INIT:
			return { ...state, liveArena: init() };
		case types.NEXT_PIECE:
			return { ...state, nextPiece: action.payload };
		case types.INIT_NEXT_PIECE:
			return { ...state, nextPiece: init(0, true) };
		case types.CHANGE_HOSTED:
			return { ...state, hosted: action.payload };
		default:
			return state;
	}
};
