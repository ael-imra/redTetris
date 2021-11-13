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
export const pieceMove = (map) => {
	return {
		type: types.PIECE_MOVE,
		payload: {
			map,
		},
	};
};
export const stateGame = (state) => {
	return {
		type: types.STATE_GAME,
		payload: state,
	};
};
