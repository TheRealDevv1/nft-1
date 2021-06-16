import axios from "axios";
import { API_URL } from "../config";
class BidService{
    constructor(){
        this.api = API_URL+'/bids'
    }
    async saveBid(bid){
        const reponse = await axios.post(this.api, bid);
        return reponse.data;
    }
    async updateBid(bid){
        const reponse = await axios.put(this.api, bid);
        return reponse.data;
    }
    async getBids(){
        const result = await axios.get(this.api);
        return result.data;
    }
    async deleteBid(id){
        const result = axios.delete(this.api, { data: {id} });
        return result.data;
    }

}
export default new BidService();