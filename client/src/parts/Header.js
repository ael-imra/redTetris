import React from 'react';
import { connect } from 'react-redux';
import Button from '../components/Button';
import Logo from '../components/Logo';
import Actions from '../store/actions';

const Header = ({ type, auth, logAutAction }) => {
	return (
		<div className='header flex flex__align-items__center'>
			<Logo />
			{type !== 'notLogin' ? (
				<>
					<p className='text__lato text__lato__white text__small text__small__xl'>{auth}</p>
					<Button size='small' type='primary' text='logout' className='header__logout' onclick={() => logAutAction()} />
				</>
			) : (
				''
			)}
		</div>
	);
};
const matStateToProps = (state) => {
	return { auth: state.auth };
};
export default connect(matStateToProps, { logAutAction: Actions.logOutAction })(Header);
