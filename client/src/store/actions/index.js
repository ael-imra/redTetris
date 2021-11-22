import * as authAction from './auth';
import { changePath } from './url';
import * as actionsRoom from './rooms';
import { socketConnect } from './socket';
import * as actionGame from './game';
import * as ActionError from './error';

const actions = {
	...authAction,
	changePath,
	...actionsRoom,
	...actionGame,
	socketConnect,
	...ActionError,
};
export default actions;
