import { Http } from '../utils/http';
import { setTokenToLocalStorage } from './local-storage.service';

export function login(form) {
    return Http.post('/public/login', form)
        .then(({ data }) => setTokenToLocalStorage(data));
}

export function signUp(form) {
    return Http.post('/public/sign-up', form)
        .then(() => login(form));
}