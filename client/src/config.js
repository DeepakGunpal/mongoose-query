import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'https://search-ads-dg.herokuapp.com/api'
})