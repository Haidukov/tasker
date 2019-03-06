import { Http } from '../utils/http';
import { setTokenToLocalStorage } from './local-storage.service';

export function login(form) {
    return Http.post('/public/login', form)
        .then(({ data }) => setTokenToLocalStorage(data))
        .then(() => fetchUserData())
}

export function signUp(form) {
    return Http.post('/public/sign-up', form)
        .then(() => login(form));
}

export function fetchUserData() {
    return Http.get('/user-data');
}
