import axios from "axios";
import { API_URL } from "../config";
class UserService{
    constructor(){
        this.api = API_URL+'/users'
    }
    async saveUser(user){
        const reponse = await axios.post(this.api, user);
        return reponse.data;
    }
    async updateUser(user){
        const reponse = await axios.put(this.api, user);
        return reponse.data;
    }
    async getUsers(){
        const result = await axios.get(this.api);
        return result.data;
    }
    async getUser(address){
        const result = await axios.get(this.api+'/'+address);
        return result.data;
    }
    async deleteUser(id){
        const result = axios.delete(this.api, { data: {id} });
        return result.data;
    }

}
export default new UserService();