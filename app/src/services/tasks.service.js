import { Http } from '../utils/http';

export function getTasks(sprintId) {
    return Http.get(`/sprints/${sprintId}/tasks`);
}

export function addTask(sprintId, form) {
    const formData = new FormData();
    for (let key in form) {
        formData.set(key, form[key]);
    }
    return Http.post(`/sprints/${sprintId}/tasks`, formData)
}
