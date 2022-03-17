import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios"
import config from '../config.json';

export const apiCall = (url: string, method: Method='GET', data: any={}): Promise<AxiosResponse<any, any>> => {
    const options: AxiosRequestConfig = {
        url: `${config.apiEndpoint}${url}`,
        method: method,
        data: data,
    }

    const token = localStorage.getItem('access_token');
    console.log('token', token);
    if (token) {
        options.headers = {
            Authorization: `Bearer ${token}`,
        }
    }


    return axios.request(options);
}
