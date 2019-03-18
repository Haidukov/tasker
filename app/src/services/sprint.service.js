import { Http } from '../utils/http';

export function getSprints(workspaceId) {
    return Http.get(`/workspaces/${workspaceId}/sprints`);
}

export function getSprint(workspaceId, sprintId) {
    return Http.get(`/workspaces/${workspaceId}/sprints/${sprintId}`);
}

export function addSprint(workspaceId, form) {
    const headers = {
        'Content-Type': 'multipart/form-data'
    };
    const formData = new FormData();
    for (let key in form) {
        formData.set(key, form[key]);
    }
    return Http.post(`/workspaces/${workspaceId}/sprints`, formData, { headers });
}
