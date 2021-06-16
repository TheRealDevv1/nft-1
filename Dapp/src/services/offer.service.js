import axios from "axios";
import { API_URL } from "../config";
class OfferService{
    constructor(){
        this.api = API_URL+'/offers'
    }
    async saveOffer(offer){
        const reponse = await axios.post(this.api, offer);
        return reponse.data;
    }
    async updateOffer(offer){
        const reponse = await axios.put(this.api, offer);
        return reponse.data;
    }
    async getOffers(){
        const result = await axios.get(this.api);
        return result.data;
    }
    async getOffersByNFT(nft_id){
        const result = await axios.get(this.api+"/getbynft/"+nft_id);
        return result.data;
    }
    async deleteOffer(id){
        const result = axios.delete(this.api, { data: {id} });
        return result.data;
    }

}
export default new OfferService();