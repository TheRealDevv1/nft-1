import {Web_3_Object,WEB_3_CONNECTED} from '../constants';

export function Web3Object(value){
    return{
        type:Web_3_Object,
        payload: value
    }
}

export function web3Connected(value){
    return{
        type: WEB_3_CONNECTED,
        payload: value
    }
}
// export default {Web3Object, web3Connected};