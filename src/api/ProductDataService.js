import axios from 'axios'
import {PRODUCT_API_URL } from '../Constants'

class ProductDataService {

    retrieveAllProducts() {
        return axios.get(`${PRODUCT_API_URL}`);
    }

}

export default new ProductDataService()