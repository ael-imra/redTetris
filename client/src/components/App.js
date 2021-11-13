import React from 'react';
import { connect } from 'react-redux';
import '../assets/scss/style.scss';
// import { Validator } from '../assets/utils/validator';
import Game from '../pages/Game';
import Home from '../pages/Home';
import Welcome from '../pages/Welcome';
import actions from '../store/actions/';
const App = ({ auth = false, authAction, socket, url }) => {
	React.useEffect(() => {
		if (socket) {
			socket.on('connected', (player) => {
				authAction(player.name);
			});
			socket.on('handle error', (error) => {
				// error, 'error';
			});
		}
	}, [socket]);
	return <>{!auth ? <Welcome /> : url === '/' ? <Home /> : <Game />}</>;
};
const mapStateToProps = (state) => {
	return {
		auth: state.auth,
		url: state.url,
		socket: state.socket,
	};
};
export default connect(mapStateToProps, { authAction: actions.authAction })(App);
