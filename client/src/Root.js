import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import reducers from './store/reducers';
import reduxPromise from 'redux-promise';


const Root = ({ initialState = {}, children }) => {
	// const socket = io(process.env.REACT_APP_URL_SOCKET);
	const store = createStore(reducers, initialState, applyMiddleware(reduxPromise));
	return <Provider store={store}>{children}</Provider>;
};

export default Root;
