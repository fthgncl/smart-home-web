export default function userRoleIncludes(userRoles, searchRoles) {
    for (const role of searchRoles) {
        if (userRoles.includes(role)) {
            return true;
        }
    }
    return false;
}
