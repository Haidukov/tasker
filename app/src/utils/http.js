import axios from 'axios';
import { getTokenFromLocalStorage } from '../services/local-storage.service';

export const Http = axios.create({
    baseURL: 'http://localhost:8000/api',
    contentType: 'application/json'
});

Http.interceptors.request.use(
    request => {
        if (!request.url.includes('/public')) {
            const { accessToken } = getTokenFromLocalStorage();
            request.headers = {
                ...request.headers,
                Authorization: `Bearer ${accessToken}`
            };
        }
        return request;

}, error => error);

