import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'

import themeReducer from '../redux/reducer/themereducer';
import web3Reducer from '../redux/reducer/web3reducer';
import { composeWithDevTools } from 'redux-devtools-extension'
const rootReducer = combineReducers({
  theme: themeReducer,
  web3:web3Reducer
});

const Store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger, thunk))
)
export default Store;
