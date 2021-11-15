import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import reducers from './store/reducers';

const Root = ({ initialState = {}, children }) => {
	const store = createStore(reducers, initialState, applyMiddleware());
	return <Provider store={store}>{children}</Provider>;
};

export default Root;
