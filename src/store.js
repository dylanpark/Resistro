import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import promise from 'redux-promise-middleware';

import reducer from './reducers/reducer';

const middleware = applyMiddleware(promise(), thunk); //logger is just for dev purpose, it logs all the actions in the conosle when they are fired.

const store = createStore(reducer, middleware);
export default store;
