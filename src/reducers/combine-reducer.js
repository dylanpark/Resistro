import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import inputReducer from 'reducers/input-reducer';
import colorReducer from 'reducers/color-reducer';

const reducer = combineReducers({inputReducer, colorReducer});

export default reducer;
