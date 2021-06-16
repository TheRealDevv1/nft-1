import axios from "axios";
import { API_URL } from "../config";
class NftService{
    constructor(){
        this.api = API_URL+'/nfts'
    }
    async saveNFT(nft){
        const reponse = await axios.post(this.api, nft);
        return reponse.data;
    }
    async updateNFT(nft){
        const reponse = await axios.put(this.api, nft);
        return reponse.data;
    }
    async getNftByAddress(address){
        const result = await axios.get(this.api+'/owner/'+address);
        return result.data;
    }
    async getNfts(){
        const result = await axios.get(this.api);
        return result.data;
    }
    async getNft(id){
        const result = await axios.get(this.api+'/'+id);
        return result.data;
    }
  
    

}
export default new NftService();