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
    return JSON.parse(localStorage.getItem('user-data'));
}
