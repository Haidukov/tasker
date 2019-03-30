import { parseJSONSafe } from '../utils/util';

export function setTokenToLocalStorage(token) {
    localStorage.setItem('token', JSON.stringify(token));
}

export function getTokenFromLocalStorage() {
    return JSON.parse(localStorage.getItem('token'));
}

export function setUserDataToLocalStorage(data) {
    return localStorage.setItem('user-data', JSON.stringify(data));
}

export function getUserFromLocalStorage() {
    return parseJSONSafe(localStorage.getItem('user-data'));
}
