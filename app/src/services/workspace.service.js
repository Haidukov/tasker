import { Http } from '../utils/http';

export function getWorkspaces() {
    return Http.get('/workspaces');
}

export function getWorkspace(id) {
    return Http.get(`/workspaces/${id}`);
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

export function getWorkspacesByStudent(id) {
    return Http.get(`/student/${id}/workspaces`);
}
