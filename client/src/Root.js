import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './store/reducers';

const Root = ({ initialState = {}, children, storeTest = null }) => {
	const store = createStore(reducers, initialState);
	return <Provider store={storeTest ? storeTest : store}>{children}</Provider>;
};

export default Root;
