import React from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import Radio from '../components/Radio';
import userA from '../assets/images/userA.png';
import user from '../assets/images/user.png';
import group from '../assets/images/group.png';
import groupA from '../assets/images/groupA.png';
import { Validator } from '../assets/utils/validator';
import { connect } from 'react-redux';
import Range from '../components/Range';

const CreateRoom = ({ visible, setVisible, socket }) => {
	const [infoRoom, setInfoRoom] = React.useState({ name: '', type: '', numMax: 0, number: 0, mode: '', speed: 1000 });
	const [error, setError] = React.useState({ name: false, type: false, numMax: false, mode: false });
	const handleCloseModel = () => {
		setVisible(false);
		setInfoRoom({ name: '', type: '', numMax: 0, mode: '', speed: 1000 });
		setError({ name: false, type: false, numMax: false, mode: false });
	};
	const handleSubmit = () => {
		const listError = { name: false, type: false, numMax: false, mode: false };
		if (!Validator('name', infoRoom.name)) listError.name = true;
		if (!Validator('typeRoom', infoRoom.mode)) listError.mode = true;
		if (!Validator('typePrivacy', infoRoom.type)) listError.type = true;
		if (!Validator('numPlayer', infoRoom.numMax) && infoRoom.mode !== 'single') listError.numMax = true;
		if (listError.name || listError.type || listError.numMax || listError.type) setError({ ...listError });
		else {
			socket.emit('create room', infoRoom.name, { maxPlayers: infoRoom.numMax, mode: infoRoom.mode, privacy: infoRoom.type, speed: infoRoom.speed });
			handleCloseModel();
		}
	};
	return visible ? (
		<div
			className='create-room flex flex__align-items__center flex__justify-content__center'
			onClick={(e) => {
				if (e.currentTarget === e.target) {
					handleCloseModel();
				}
			}}>
			<div className='create-room__menu'>
				<p className='text__game text__small text__medium text__center'>Create room</p>
				<div className='hr u__margin--medium__y u__margin--medium__x'></div>
				<p className='text__lato text__small text__small__xl ' style={{ marginLeft: 5 }}>
					Name :{' '}
					<span style={{ color: 'red', display: error.name ? 'inline-block' : 'none', fontSize: '1.3rem', marginLeft: 5 }}>Name Must Contain between 3 - 15 Characters length</span>
				</p>
				<Input
					className='u__margin--medium__x__x text__lato text__lato__white  text__small text__small__xl u__margin--medium__y'
					placeHolder='Type Room Name'
					onChange={(value) => {
						setInfoRoom({ ...infoRoom, name: value });
						setError({ ...error, name: false });
					}}
					defaultValue={infoRoom.name}
					color='white'
					size='small'
					isError={error.name}
					onEnter={handleSubmit}
				/>
				{infoRoom.mode === 'multi' ? (
					<div className='create-room__menu__player'>
						<p className='text__lato text__small text__small__xl' style={{ marginLeft: 5 }}>
							max players :
							<span style={{ color: 'red', display: error.numMax ? 'inline-block' : 'none', fontSize: '1.3rem', marginLeft: 5 }}>Max Players Must Be between 2 and 10</span>
						</p>
						<Input
							className='u__margin--medium__x__x text__lato text__lato__white  text__small text__small__xl u__margin--medium__y'
							placeHolder='number of players'
							onChange={(value) => {
								setInfoRoom({ ...infoRoom, numMax: value });
								setError({ ...error, numMax: false });
							}}
							defaultValue={infoRoom.numMax}
							color='white'
							size='small'
							isError={error.numMax}
							onEnter={handleSubmit}
						/>
					</div>
				) : (
					''
				)}
				<p className='text__lato text__small text__small__xl text__lato__white' style={{ marginLeft: 5 }}>
					Level: <span style={{ color: 'red', display: error.mode ? 'inline-block' : 'none', fontSize: '1.3rem', marginLeft: 5 }}>You Should Select A Type</span>
				</p>
				<Range
					onChange={(value) => {
						setInfoRoom({ ...infoRoom, speed: value });
					}}
					value={infoRoom.speed}
				/>
				<p className='text__lato text__small text__small__xl' style={{ marginLeft: 5 }}>
					Type room : <span style={{ color: 'red', display: error.mode ? 'inline-block' : 'none', fontSize: '1.3rem', marginLeft: 5 }}>You Should Select A Type</span>
				</p>
				<Radio
					name='type'
					className='u__margin--medium__y u__margin--medium__x'
					onChange={(value) => {
						setInfoRoom({ ...infoRoom, mode: value });
					}}
					option={[
						{ label: 'single', value: 'single', icon: { normal: userA, checked: user } },
						{ label: 'multiple', value: 'multi', icon: { normal: groupA, checked: group } },
					]}
					defaultValue={infoRoom.mode}
				/>
				<p className='text__lato text__small text__small__xl' style={{ marginLeft: 5 }}>
					Type privacy: <span style={{ color: 'red', display: error.type ? 'inline-block' : 'none', fontSize: '1.3rem', marginLeft: 5 }}>You Should Select A Type</span>
				</p>
				<Radio
					name='visible'
					className='u__margin--medium__y u__margin--medium__x'
					onChange={(value) => {
						setInfoRoom({ ...infoRoom, type: value });
					}}
					option={[
						{ label: 'public', value: 'public' },
						{ label: 'private', value: 'private' },
					]}
					defaultValue={infoRoom.type}
				/>

				<Button size='small' type='primary' text='Create room' className='u__margin--medium__x btn-create' onclick={handleSubmit} font='game' />
			</div>
		</div>
	) : (
		''
	);
};
const mapStateToProps = (state) => {
	return {
		socket: state.socket,
	};
};
export default connect(mapStateToProps)(CreateRoom);
