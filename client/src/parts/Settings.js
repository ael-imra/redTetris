import React from 'react';
import BoxHeader from '../components/BoxHeader';
import Button from '../components/Button';
import Input from '../components/Input';
import Radio from '../components/Radio';
import Range from '../components/Range';

const Settings = ({ info, startGame = false, handleSubmit }) => {
	const [infoRoom, setInfoRoom] = React.useState({ ...info });
	React.useEffect(() => {
		setInfoRoom({ ...info });
	}, [info]);

	return (
		<div className='game__parts__1 '>
			<div className='game__parts__1__settings'>
				<BoxHeader text='Settings' />
				<div className='game__parts__1__settings__body'>
					<p className='text__lato text__small text__small__xl text__lato__white' style={{ marginLeft: 5 }}>
						Level:
					</p>
					<Range
						onChange={(value) => {
							setInfoRoom({ ...infoRoom, speed: value });
						}}
						value={infoRoom.speed}
					/>
					{infoRoom.mode === 'multi' ? (
						<>
							<p className='text__lato text__small text__small__xl text__lato__white' style={{ marginLeft: 5 }}>
								max players :
							</p>
							<Input
								className='u__margin--medium__x__x text__lato text__lato__white  text__small text__small__xl u__margin--medium__y'
								placeHolder='number of players'
								onChange={(value) => {
									setInfoRoom({ ...infoRoom, maxPlayers: value });
								}}
								color='blackFocus'
								defaultValue={infoRoom.maxPlayers}
								size='small'
								onEnter={() => handleSubmit(infoRoom)}
							/>
						</>
					) : (
						''
					)}
					<p className='text__lato text__small text__small__xl text__lato__white' style={{ marginLeft: 5 }}>
						Type room :
					</p>
					<Radio
						name='privacy'
						className='u__margin--medium__y u__margin--medium__x'
						onChange={(value) => {
							setInfoRoom({ ...infoRoom, mode: value });
						}}
						option={[
							{ label: 'single', value: 'single' },
							{ label: 'multiple', value: 'multi' },
						]}
						defaultValue={infoRoom.mode}
					/>
					<p className='text__lato text__small text__small__xl text__lato__white' style={{ marginLeft: 5 }}>
						Type privacy:
					</p>
					<Radio
						name='visible'
						className='u__margin--medium__y u__margin--medium__x'
						onChange={(value) => {
							setInfoRoom({ ...infoRoom, privacy: value });
						}}
						option={[
							{ label: 'public', value: 'public' },
							{ label: 'private', value: 'private' },
						]}
						defaultValue={infoRoom.privacy}
					/>
					<Button
						size='small'
						type='primary'
						text='Save Setting'
						className='u__margin--medium__x btn-create u__margin--auto__x'
						font='game'
						disabled={startGame ? true : false}
						onclick={() => {
							setInfoRoom('');
							handleSubmit(infoRoom);
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default Settings;
