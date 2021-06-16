import ERC721_ABI from "../../abis/ERC721.json";
import { ERC721_ADDRESS, ERC721_EXCHANGER_ADDRESS } from '../../config';
import { creators, parseAbi } from '../utils';

class ERC721Minter{
    constructor(web3){
        this.web3 = web3;
        this.contract = new this.web3.eth.Contract(parseAbi(ERC721_ABI), ERC721_ADDRESS)
    }
    async mintERC721(tokenId, tokenURI, minters, fees, minter){
        const zeroWord = "0x0000000000000000000000000000000000000000000000000000000000000000";
        console.log(minters);
        const data  = await this.contract.methods.mintAndTransfer([tokenId, tokenURI, creators(minters), fees, [zeroWord]], minter).send({from: minter});
        return data;
    }
    async setApprovalForAll(owner){
        const data  = await this.contract.methods.setApprovalForAll(ERC721_EXCHANGER_ADDRESS, true).send({from: owner});
        return data;
    }
    async ownerOf(assetId, owner){
        const data  = await this.contract.methods.ownerOf(assetId).call();
        return data;
    }
    async isSetApprovalForAll(owner){
        const data = await this.contract.methods.isApprovedForAll(owner, ERC721_EXCHANGER_ADDRESS).call();
        return data;
    }
}
export default ERC721Minter;
