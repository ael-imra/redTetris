import React, { useRef } from 'react';
import { connect } from 'react-redux';
import Arena from '../components/Arena';
import BoxHeader from '../components/BoxHeader';
import Chat from '../components/Chat';
import NextPiece from '../components/NextPiece';
import Header from '../parts/Header';
import LiveGame from '../parts/LiveGame';
import StartGame from '../parts/StartGame';
import Button from '../components/Button';
const Game = ({ arena, startGame, gameInfo, socket, auth }) => {
	const arenaRef = useRef(null);
	React.useEffect(() => {
		if (arenaRef && arenaRef?.current) arenaRef.current.focus();
	}, [startGame]);

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
						</div>
					) : (
						''
					)}
					{(gameInfo.hosted === auth && startGame) || gameInfo.hosted !== auth ? (
						<Arena
							centerAlign
							data={arena.liveArena}
							onKeyDown={(e) => {
								if (e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40 || e.keyCode === 37 || e.keyCode === 32) socket.emit('move piece', e.keyCode);
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
							{gameInfo.hosted === auth ? (
								<Button
									type='primary'
									text='Replay'
									size='large'
									font='game'
									style={{ padding: '1.5rem 4rem' }}
									onclick={() => {
										socket.emit('restart game');
									}}
								/>
							) : (
								''
							)}
						</div>
					)}
					{console.log(gameInfo.pause)}
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
							font='game'
							style={{ padding: '1.5rem 4rem' }}
							onclick={() => {
								socket.emit('exit room');
							}}
						/>
						{startGame && gameInfo.hosted === auth ? (
							<Button
								type='primary'
								text={gameInfo.pause ? 'resume' : 'pause game'}
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
						<Chat />
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		arena: state.myArena,
		startGame: state.startGame,
		gameInfo: state.gameInfo,
		socket: state.socket,
		auth: state.auth,
	};
};
export default connect(mapStateToProps)(Game);
