import React from 'react';
import { connect } from 'react-redux';
import Arena from '../components/Arena';
import BoxHeader from '../components/BoxHeader';
import ListUser from './ListUser';
import actions from '../store/actions';

const LiveGame = ({ infoGame, userActiveAction, initArenas }) => {
	React.useEffect(() => {
		if (infoGame.length !== 0) userActiveAction(infoGame.players[0]);
		initArenas([...infoGame.players]);
		// eslint-disable-next-line
	}, [infoGame.players]);
	return (
		<div className={`game__parts__1 flex flex__justify-content__space-between ${infoGame.options.mode === 'single' ? 'mode-sing' : ''}`}>
			<div className='game__parts__1__top'>
				{infoGame.options.mode !== 'single' ? (
					<>
						<BoxHeader text='live game' />
						{infoGame?.userActive ? (
							<div className='live-game'>
								<div className='game__parts__1__box1'>
									<Arena size='small' className='u__margin--medium__x__x' data={infoGame.arenas[infoGame.userActive]} />
								</div>
								<div className='game__parts__1__box1'>
									<ListUser
										list={infoGame.players}
										active={infoGame.userActive}
										onUserActive={(index) => {
											userActiveAction(index);
										}}
									/>
								</div>
							</div>
						) : (
							''
						)}
					</>
				) : (
					''
				)}
			</div>
		</div>
	);
};
const mapStateToProps = (state) => {
	return {
		infoGame: state.gameInfo,
	};
};
export default connect(mapStateToProps, { userActiveAction: actions.userActive, initArenas: actions.arenasInit })(LiveGame);
