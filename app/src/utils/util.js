export function parseJSONSafe(json) {
    try {
        return JSON.parse(json);
    } catch (e) {
        return null;
    }
}
