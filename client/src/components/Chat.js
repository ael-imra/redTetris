import React, { useState } from 'react';
import Input from '../components/Input';
import Button from './Button';
import iconSend from '../assets/icons/send.png';
import { connect } from 'react-redux';
import actions from '../store/actions';

const Chat = ({ socket, listMessage = [], AddRefBoxMessageAction }) => {
	const [message, setMessage] = useState('');
	const chatRef = React.useRef(null);
	const handleSubmit = () => {
		setMessage('');
		if (message !== '') {
			socket.emit('message', message);
		}
	};
	React.useEffect(() => {
		AddRefBoxMessageAction(chatRef);
		// eslint-disable-next-line
	}, []);
	return (
		<div className='chat'>
			<div className='chat__body u__padding--medium scroll' ref={chatRef}>
				{listMessage.map((item, key) => (
					<p key={key} className='text__lato text__lato__white text__small text__small__l u__margin--medium__y__x'>
						{`[${item.name}]`}:
						<span className='text__lato text__lato__white text__small text__small__l' style={{ wordBreak: 'break-all' }}>
							{' '}
							{item.message}
						</span>
					</p>
				))}
			</div>
			<div className='chat__footer flex flex__align-items__center flex__justify-content__space-evenly'>
				<Input
					className='text__lato text__lato__white  text__small text__small__xl'
					placeHolder='type your username'
					style={{ width: '85%' }}
					onChange={(value) => {
						setMessage(value);
					}}
					defaultValue={message}
					size='small'
					// isError={error.name}
					onEnter={handleSubmit}
					color='blackFocus'
				/>
				<Button size='small' icon={iconSend} type='primary' sizeIcon onclick={handleSubmit} />
			</div>
		</div>
	);
};
const matStateToProps = (state) => {
	return {
		listMessage: state.game.messages,
		auth: state.auth,
		socket: state.socket,
	};
};
export default connect(matStateToProps, { AddRefBoxMessageAction: actions.AddRefBoxMessage })(Chat);
