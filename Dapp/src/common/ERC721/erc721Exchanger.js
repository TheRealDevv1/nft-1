import ERC721_EXCHANGER_ABI from "../../abis/WoomExchange.json";
import { ERC721_EXCHANGER_ADDRESS } from '../../config';
import { parseAbi } from '../utils';

class ERC721Exchanger{
    constructor(web3){
        this.web3 = web3;
        this.contract = new this.web3.eth.Contract(parseAbi(ERC721_EXCHANGER_ABI), ERC721_EXCHANGER_ADDRESS)
    }
    async addOffer(
        seller,
        collection,
        assetId,
        token,
        isEther,
        price,
        isForSell,
        isForAuction,
        expiresAt
    ){
        const data  = await this.contract.methods.addOffer(
            seller,
            collection,
            assetId,
            token,
            isEther,
            price,
            isForSell,
            isForAuction,
            expiresAt
        ).send({from: seller});
        return data;
    }
    async buyOffer(
        buyer,
        collection,
        assetId,
        value
    ){
        const data  = await this.contract.methods.buyOffer(
            collection,
            assetId,
        ).send({from: buyer, value});
        return data;
    }
    async placeBid(
        bidder,
        collection,
        assetId,
        token,
        price,
        expiresAt,
    ){
        const data  = await this.contract.methods.safePlaceBid(
            collection,
            assetId,
            token,
            price,
            expiresAt
        ).send({from: bidder});
        return data;
    }
    async cancelBid(
        collection,
        assetId,
        bidder
    ){
        const data  = await this.contract.methods.cancelBid(
            collection,
            assetId,
            bidder
        ).send({from: bidder});
        return data;
    }
    async acceptBid(
        owner,
        collection,
        assetId,
        bidder
    ){
        const data  = await this.contract.methods.acceptBid(
            collection,
            assetId,
            bidder
        ).send({from: owner});
        return data;
    }
    async setBid(
        owner,
        collection,
        assetId,
        bidder
    ){
        const data  = await this.contract.methods.acceptBid(
            collection,
            assetId,
            bidder
        ).send({from: owner});
        return data;
    }
    async setOfferPrice(
        owner,
        collection,
        assetId,
        price
    ){
        const data = await this.contract.methods.setOfferPrice(
            collection,
            assetId,
            price
        ).send({from: owner})
        return data;
    }
    async setForSell(
        owner,
        collection,
        assetId,
        isForSell
    ){
        const data = await this.contract.methods.setForSell(
            collection,
            assetId,
            isForSell
        ).send({from: owner})
        return data;
    }
    
}
export default ERC721Exchanger;
