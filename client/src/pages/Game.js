import React, { useRef } from 'react';
import { connect } from 'react-redux';
import Arena from '../components/Arena';
import BoxHeader from '../components/BoxHeader';
import Chat from '../components/Chat';
import NextPiece from '../components/NextPiece';
import Header from '../parts/Header';
import LiveGame from '../parts/LiveGame';
import StartGame from '../parts/StartGame';
import actions from '../store/actions';
import * as shapes from '../assets/utils/shapes';
import { draw } from '../assets/utils/draw';
import { init } from '../store/reducers/gameReducer';
import Button from '../components/Button';
const Game = ({
	myArena,
	startGame,
	gameInfo,
	socket,
	addUserInRoomAction,
	auth,
	changeUrlAction,
	startGameAction,
	newArenaAction,
	StateGameActon,
	newScoreAction,
	nextPieceAction,
	newArenasAction,
	addMessageAction,
	resetGameAction,
	pauseGameAction,
}) => {
	const [arena, setArena] = React.useState(myArena);
	const arenaRef = useRef(null);
	const chatRef = useRef(null);
	const resetNext = init(0, true);
	React.useEffect(() => {
		if (arenaRef && arenaRef?.current) arenaRef.current.focus();
	}, [startGame]);
	React.useEffect(() => {
		socket.off('game started');
		socket.off('piece moved');
		socket.off('piece completed');
		socket.off('room exited');
		socket.off('player joined');
		socket.off('message');
		socket.on('player joined', (player) => {
			addUserInRoomAction(player.name);
		});

		socket.on('room exited', () => {
			window.location.href = '/#';
			changeUrlAction('/');
			resetGameAction();
		});

		socket.on('message', (message) => {
			addMessageAction(message.message, message.name);
			setTimeout((gameInfo.refBoxChat.current.scrollTop = gameInfo.refBoxChat.current.scrollHeight), 0);
		});

		socket.on('game started', () => {
			startGameAction(true);
		});
		socket.on('game paused', () => {
			pauseGameAction();
		});

		socket.on('piece moved', (info) => {
			if (info.player === auth) {
				const newShape = shapes[info.shape](...info.point);
				let test = draw(newShape, JSON.parse(JSON.stringify(myArena)), info.color);
				const shadow = shapes[info.shape](info.point[0], info.shadow);
				setArena(draw(shadow, JSON.parse(JSON.stringify(test)), 7));
			}
		});

		socket.on('piece completed', (info) => {
			if (info.player === auth) {
				nextPieceAction(draw(shapes[info.nextPiecePiece](2, 2), JSON.parse(JSON.stringify(resetNext))));
				StateGameActon(!info.failed && !info.win ? 'waiting' : info.win ? 'win' : 'failed');
				newArenaAction(info.field);
				newScoreAction(info.score);
			} else {
				newArenasAction(info.field, info.player);
			}
		});
		// eslint-disable-next-line
	}, [myArena, arena, gameInfo]);

	return (
		<div className='game flex flex__direction__column'>
			<Header type='home' />
			<div className='game__header flex flex__align-items__center flex__justify-content__center'>
				<p className='text__debug  text__large__xl text__center'>
					<span style={{ color: 'red' }}>RED</span>TETRIS
				</p>
			</div>
			<div className='game__parts flex flex__justify-content__space-evenly'>
				{gameInfo.players.length !== 0 ? <LiveGame /> : <div className='game__parts__1'></div>}

				<div className='game__parts__2'>
					{gameInfo.hosted === auth && !startGame ? (
						<StartGame />
					) : gameInfo.hosted !== auth && !startGame ? (
						<div className='Result-game flex flex__align-items__center  flex__direction__column flex__justify-content__center waiting'>
							<p className='text__debug  text__large__l text__center ' style={{ marginBottom: 50 }}>
								waiting host to start game
							</p>
							<Button
								type='primary'
								text='Back to home'
								size='large'
								font='game'
								style={{ padding: '1.5rem 4rem' }}
								onclick={() => {
									socket.emit('exit room');
								}}
							/>
						</div>
					) : (
						''
					)}
					{(gameInfo.hosted === auth && startGame) || gameInfo.hosted !== auth ? (
						<Arena
							centerAlign
							data={arena}
							onKeyDown={(e) => {
								socket.emit('move piece', e.keyCode);
							}}
							refArena={arenaRef}
						/>
					) : (
						''
					)}
					{(gameInfo && !gameInfo.stateGame) || (gameInfo && gameInfo.stateGame === 'waiting') ? (
						''
					) : (
						<div className='Result-game flex flex__align-items__center  flex__direction__column flex__justify-content__center game-result'>
							<p className='text__debug  text__large__l text__center ' style={{ marginBottom: 20 }}>
								{gameInfo.stateGame}
							</p>
							<Button
								type='primary'
								text='Back to home'
								size='large'
								font='game'
								style={{ padding: '1.5rem 4rem' }}
								onclick={() => {
									socket.emit('exit room');
								}}
							/>
						</div>
					)}
					{gameInfo && gameInfo.pause && startGame ? (
						<div className='Result-game flex flex__align-items__center  flex__direction__column flex__justify-content__center game-result'>
							<p className='text__debug  text__large__l text__center ' style={{ marginBottom: 20 }}>
								pause game
							</p>
						</div>
					) : (
						''
					)}
					<div className='flex flex__justify-content__space-evenly u__margin--medium__x__x'>
						<Button
							type='primary'
							text='leave game'
							// size='large'
							font='game'
							style={{ padding: '1.5rem 4rem' }}
							onclick={() => {
								socket.emit('exit room');
							}}
						/>
						{startGame ? (
							<Button
								type='primary'
								text={gameInfo.pause ? 'resume' : 'pause game'}
								// size='large'
								font='game'
								style={{ padding: '1.5rem 4rem' }}
								onclick={() => {
									socket.emit('pause game');
								}}
							/>
						) : (
							''
						)}
					</div>
				</div>

				<div className={`game__parts__3 ${gameInfo.options.mode === 'single' ? 'mode-sing' : ''}`}>
					<div className='flex flex__justify-content__space-between'>
						<div className='game__parts__3__box'>
							<BoxHeader text='Next Piece' />
							<div className='flex flex__align-items__center flex__justify-content__center game__parts__3__box__div'>
								<NextPiece />
							</div>
						</div>
						<div className='game__parts__3__box'>
							<BoxHeader text='You Score' />
							<div className='flex flex__align-items__center flex__justify-content__center game__parts__3__box__div'>
								<p className='text__game text__lato__white text__small text__large__l'>{gameInfo.score}</p>
							</div>
						</div>
					</div>
					<div className='game__parts__3__chat'>
						<BoxHeader text='Box chat' />
						<Chat chartRef={chatRef} />
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		myArena: state.myArena,
		startGame: state.startGame,
		gameInfo: state.gameInfo,
		socket: state.socket,
		auth: state.auth,
		nextPiece: state.nextPiece,
	};
};
export default connect(mapStateToProps, {
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
})(Game);
