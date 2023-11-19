import axios from "axios";
import { API_TOKEN } from './../../config';

const APIBRAPI_BASE_URL = 'https://brapi.dev/api/quote/list';

class ApiService {

    buscarAcoes = async (): Promise<any> => {
        return await axios.get(`${APIBRAPI_BASE_URL}?limit=10&token=${API_TOKEN}`);
    }
}



export default new ApiService();