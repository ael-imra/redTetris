import React from 'react';
import { connect } from 'react-redux';
import Arena from '../components/Arena';
import BoxHeader from '../components/BoxHeader';
import ListUser from './ListUser';
import Actions from '../store/actions';

const LiveGame = ({ gameStore, userActiveAction }) => {
	return (
		<div className={`game__parts__1 flex flex__justify-content__space-between `}>
			<div className='game__parts__1__top'>
				{gameStore.options.mode !== 'single' ? (
					<>
						<BoxHeader text='live game' />
						{gameStore?.userActive ? (
							<div className='live-game'>
								<div className='game__parts__1__box1'>
									<Arena size='small' className='u__margin--medium__x__x' data={gameStore.arenas[gameStore.userActive]} />
								</div>
								<div className='game__parts__1__box1'>
									<ListUser
										list={gameStore.players}
										active={gameStore.userActive}
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

export default connect(null, { userActiveAction: Actions.userActive })(LiveGame);
