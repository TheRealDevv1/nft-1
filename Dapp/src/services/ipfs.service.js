import axios from "axios";
import { API_URL }  from '../config'
class IpfsService{
    constructor(){
        this.api = API_URL+'/ipfs';
    }
    async saveMetaData(name, description, file){
        const result = await axios.post(this.api, {
            name, description, file
        });
        return result.data;
    }
    async getMetaData(hash){
        const data = await axios.get(this.api+'/'+hash);
        return data;
    }
}
export default new IpfsService();