export function setTokenToLocalStorage(token) {
    localStorage.setItem('token', JSON.stringify(token));
}

export function getTokenFromLocalStorage() {
    return JSON.parse(localStorage.getItem('token'));
}