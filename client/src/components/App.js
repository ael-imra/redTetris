import React from 'react';
import { connect } from 'react-redux';
import '../assets/scss/style.scss';
import Game from '../pages/Game';
import Home from '../pages/Home';
import Welcome from '../pages/Welcome';
import Error from './Error';
import SocketMiddle from '../services/middleware';
import actions from '../store/actions/';
const App = ({ auth, url, closeErrorAction, error }) => {
	return (
		<>
			<SocketMiddle>
				<Error closeErrorAction={closeErrorAction} error={error} />
				{auth === null ? '' : auth === false ? <Welcome /> : url === '/' ? <Home /> : <Game />}
			</SocketMiddle>
		</>
	);
};
const mapStateToProps = (state) => {
	return {
		auth: state.auth,
		url: state.url,
		error: state.error,
	};
};
export default connect(mapStateToProps, { closeErrorAction: actions.errorClose })(App);
