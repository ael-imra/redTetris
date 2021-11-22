import React from 'react';
import { connect } from 'react-redux';
import '../assets/scss/style.scss';
import Game from '../pages/Game';
import Home from '../pages/Home';
import Welcome from '../pages/Welcome';
import actions from '../store/actions/';
import Error from './Error';
import SocketMiddle from '../services/middleware';
const App = ({ auth, url }) => {
	return (
		<>
			<SocketMiddle>
				{console.log(auth)}
				<Error />
				{auth === null ? '' : auth === false ? <Welcome /> : url === '/' ? <Home /> : <Game />}
			</SocketMiddle>
		</>
	);
};
const mapStateToProps = (state) => {
	return {
		auth: state.auth,
		url: state.url,
	};
};
export default connect(mapStateToProps)(App);
