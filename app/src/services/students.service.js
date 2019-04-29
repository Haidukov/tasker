import { Http } from '../utils/http';
import { fetchUserData, login } from './auth.service';
import { setTokenToLocalStorage } from './local-storage.service';

export function getStudentsByWorkspace(workspaceId) {
    return Http.get(`/workspaces/${workspaceId}/students`);
}

export function createStudentInvite(workspaceId, email) {
    return Http.post(`/workspaces/${workspaceId}/invites`, { email });
}

export async function confirmInvite(inviteId, form) {
    const { data } = await Http.post(`/invites/${inviteId}`, form);
    setTokenToLocalStorage(data);
    return await fetchUserData();
}
