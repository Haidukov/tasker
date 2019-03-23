import { Http } from '../utils/http';
import { fetchUserData, login } from './auth.service';
import { setTokenToLocalStorage } from './local-storage.service';

export function createStudentInvite(workspaceId, email) {
    return Http.post(`/workspaces/${workspaceId}/invites`, { email });
}

export function confirmInvite(inviteId, form) {
    return Http.post(`/invites/${inviteId}`, form)
        .then(({ data }) => setTokenToLocalStorage(data))
        .then(fetchUserData);
}
