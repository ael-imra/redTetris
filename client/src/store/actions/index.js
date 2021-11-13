import * as authAction from './auth';
import { changePath } from './url';
import * as actionsRoom from './rooms';
import { socketConnect } from './socket';
import { addMessage } from './message';
import * as actionGame from './game';

const actions = {
	...authAction,
	changePath,
	...actionsRoom,
	addMessage,
	...actionGame,
	socketConnect,
};
export default actions;
