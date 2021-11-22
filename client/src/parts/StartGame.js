import React from 'react';
import { connect } from 'react-redux';
import BoxHeader from '../components/BoxHeader';
import ListUser from './ListUser';

const StartGame = ({ gameInfo, socket }) => {
	return (
		<div className='start-container u__margin--auto__x'>
			<BoxHeader text='setting game' />
			<div className='start-container__list-User'>
				{gameInfo.players ? (
					<ListUser
						list={gameInfo.players}
						isBorder
						onRemove={(name) => {
							socket.emit('kick', name);
						}}
						mode={gameInfo.options.mode}
						button={{
							text: 'Start Game',
							type: 'primary',
							font: 'game',
							disabled: gameInfo.players.length === 0 && gameInfo.options.mode !== 'single' ? true : false,
							onclick: () => {
								socket.emit('start game');
							},
							className: 'u__margin--auto__x u__margin--medium__x btn__Box-Shadow',
						}}
					/>
				) : (
					''
				)}
			</div>
		</div>
	);
};
const mapStateToProps = (state) => {
	return {
		gameInfo: state.gameInfo,
		socket: state.socket,
	};
};
export default connect(mapStateToProps)(StartGame);
