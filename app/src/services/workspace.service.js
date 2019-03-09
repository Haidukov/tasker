import { Http } from '../utils/http';

export function getWorkspaces() {
    return Http.get('/workspaces');
}

export function addWorkspace(form) {
    const headers = {
        'Content-Type': 'multipart/form-data'
    };
    const formData = new FormData();
    for (let key in form) {
        formData.set(key, form[key]);
    }
    return Http.post('/workspaces', formData, { headers });
}
