import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import inputReducer from './input-reducer';
import colorReducer from './color-reducer';

const reducer = combineReducers({inputReducer, colorReducer});

export default reducer;
