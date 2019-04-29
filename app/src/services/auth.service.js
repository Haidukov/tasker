import { Http } from '../utils/http';
import { setTokenToLocalStorage, setUserDataToLocalStorage } from './local-storage.service';

export async function login(form) {
    const { data } = await Http.post('/public/login', form);
    setTokenToLocalStorage(data);
    return await fetchUserData();
}

export async function signUp(form) {
    await Http.post('/public/sign-up', form);
    return await login(form);
}

export async function fetchUserData() {
    const { data } = await Http.get('/user-data');
    setUserDataToLocalStorage(data);
    return data;
}

export function refreshToken(token) {
    return Http.post('/refresh-token', { token });
}
