import * as types from './types';

export const arenaInit = () => {
	return {
		type: types.ARENA_INIT,
	};
};

export const listUser = (list) => {
	return {
		type: types.ADD_USER,
		payload: list,
	};
};

export const removeUser = (user) => {
	return {
		type: types.REMOVE_USER,
		payload: user,
	};
};

export const startGame = () => {
	return {
		type: types.START_GAME,
	};
};

export const userActive = (user) => {
	return {
		type: types.USER_ACTIVE,
		payload: user,
	};
};

export const arenasInit = (list) => {
	return {
		type: types.ARENAS_INIT,
		payload: list,
	};
};
export const newArenas = (newArena, user) => {
	return {
		type: types.NEW_ARENAS,
		payload: {
			newArena: newArena,
			user: user,
		},
	};
};

export const nextPiece = (piece) => {
	return {
		type: types.NEXT_PIECE,
		payload: piece,
	};
};

export const initNextPiece = () => {
	return {
		type: types.INIT_NEXT_PIECE,
	};
};

export const initGame = (info) => {
	return {
		type: types.INIT_GAME,
		payload: {
			...info,
		},
	};
};

export const newArena = (arena) => {
	return {
		type: types.NEW_ARENA,
		payload: arena,
	};
};

// export const pieceMove = (map) => {
// 	return {
// 		type: types.PIECE_MOVE,
// 		payload: {
// 			map,
// 		},
// 	};
// };

export const stateGame = (state) => {
	return {
		type: types.STATE_GAME,
		payload: state,
	};
};

export const newScore = (state) => {
	return {
		type: types.NEW_SCORE,
		payload: state,
	};
};

export const addMessage = (message, name) => {
	return {
		type: types.ADD_MESSAGE,
		payload: {
			message: message,
			name: name,
		},
	};
};
export const AddRefBoxMessage = (ref) => {
	return {
		type: types.ADD_REFERENCE_BOX,
		payload: ref,
	};
};

export const ResetGame = () => {
	return {
		type: types.RESET_GAME,
	};
};
export const pauseGame = () => {
	return {
		type: types.PAUSE_GAME,
	};
};
export const liveArena = (newArena) => {
	return {
		type: types.LIVE_ARENA,
		payload: newArena,
	};
};
export const liveArenaInit = () => {
	return {
		type: types.LIVE_ARENA_INIT,
	};
};

export const changeHosted = (hosted) => {
	return {
		type: types.CHANGE_HOSTED,
		payload: hosted,
	};
};
export const changeOptions = (options) => {
	return {
		type: types.CHANGE_OPTIONS,
		payload: options,
	};
};
