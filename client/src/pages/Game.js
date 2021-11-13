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
	nextPiece,
	nextPieceAction,
}) => {
	const [arena, setArena] = React.useState(myArena);
	const [color, setColor] = React.useState(1);
	const arenaRef = useRef(null);
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
		socket.on('player joined', (player) => {
			addUserInRoomAction(player.name);
		});

		socket.on('room exited', () => {
			changeUrlAction('/');
		});

		socket.on('game started', () => {
			startGameAction(true);
		});

		socket.on('piece moved', (info) => {
			if (info.player === auth) {
				const newShape = shapes[info.shape](...info.point);
				setArena(draw(newShape, JSON.parse(JSON.stringify(myArena)), color));
			}
		});

		socket.on('piece completed', (info) => {
			setColor(Math.floor(Math.random() * 5) + 1);
			// nextPieceAction(draw(shapes[info.nextPiecePiece](0, 2), JSON.parse(JSON.stringify(resetNext))));
			StateGameActon(!info.failed && !info.win ? 'waiting' : info.win ? 'win' : 'failed');
			newArenaAction(info.field);
		});
	}, [myArena, color, arena]);
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
									window.location.href = '/#';
									changeUrlAction('/');
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
								console.log(e.keyCode);
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
									window.location.href = '/#';
									changeUrlAction('/');
								}}
							/>
						</div>
					)}
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
							<BoxHeader text='You Score' isBorder />
							<div className='flex flex__align-items__center flex__justify-content__center game__parts__3__box__div'>
								<p className='text__game text__lato__white text__small text__large__l'>250</p>
							</div>
						</div>
					</div>
					<div className='game__parts__3__chat'>
						<BoxHeader text='Box chat' isBorder />
						<Chat />
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
})(Game);
