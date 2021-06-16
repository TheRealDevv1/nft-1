import {Web_3_Object,WEB_3_CONNECTED} from '../constants';
const initialState = {
web3object:{},
};

const web3Reducer = (state = initialState, action) => {
  switch (action.type) {
    case Web_3_Object:
        return {
          ...state,
          web3object: action.payload,
        };
     case WEB_3_CONNECTED:
       return {
         ...state,
         web3connected: action.payload,
       }
    default: return state;   
      }
    } 
export default web3Reducer;