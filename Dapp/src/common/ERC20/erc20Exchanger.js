import ERC20 from "../../abis/ERC20.json";
import { parseAbi } from '../utils';

class ERC20Exchanger{
    constructor(web3, address){
        this.web3 = web3;
        this.contract = new this.web3.eth.Contract(ERC20, address)
    }
    async approve(
        bidder,
        collection,
        price
    ){
        const data  = await this.contract.methods.approve(
            collection,
            price
        ).send({from: bidder});
        return data;
    }
    
}
export default ERC20Exchanger;
