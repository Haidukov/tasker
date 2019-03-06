import axios from 'axios';
import { getTokenFromLocalStorage, setTokenToLocalStorage } from '../services/local-storage.service';
import { refreshToken as refreshAuthToken } from '../services/auth.service';

export const Http = axios.create({
    baseURL: 'http://localhost:8000/api',
    contentType: 'application/json'
});

Http.interceptors.request.use(
    request => {
        if (!request.url.includes('/public')) {
            const token = getTokenFromLocalStorage();
            if (token) {
                request.headers = {
                    ...request.headers,
                    Authorization: `Bearer ${token.accessToken}`
                };
            }
            else {
                //throw new Error('jwt token don`t exists');
            }
        }
        return request;

}, error => error);

Http.interceptors.response.use(
    response => response,
    async error => {
        const token = getTokenFromLocalStorage();
        if (!token || error.response.status !== 401 || error.config.retry) {
            throw error;
        }
        else {
            if (!error.config.url.includes('refresh')) {
                try {
                    const { data } = await refreshAuthToken(token.refreshToken);
                    setTokenToLocalStorage(data);
                    const newRequest = {
                        ...error.config,
                        retry: true,

                    };
                    newRequest.headers = {
                        ...newRequest.headers,
                        Authorization: `Bearer ${data['accessToken']}`
                    }
                    return axios(newRequest);

                } catch (e) {
                    console.log('error');
                    throw e;
                }
            }
            else {
                console.log('error');
                throw error;
            }
        }
    }
)

