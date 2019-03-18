import { Http } from '../utils/http';

export function createStudentInvite(workspaceId, email) {
    return Http.post(`/workspaces/${workspaceId}/invites`, { email });
}
