import {HttpMethods, httpRequest} from "../NetworkService";
import {Tag} from "antd";

const userRolesColors = {
    "RETARDED": "blue",
    "MORONDERATOR": "purple",
    "ADMINIDIOT": "red"
}

export function renderUserRoleTag(role) {
    return <Tag color={userRolesColors[role] ?? '#ffffff'}>{role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()}</Tag>
}

export function getAllUsers() {
    return new Promise((resolve) => {
        httpRequest(
            HttpMethods.get,
            "http://localhost:8081/users/",
        )
            .then(response => resolve(response?.body));
    });
}

export function updateUser(user) {
    if (!user || !user.id) {
        throw new Error();
    }

    return new Promise((resolve) => {
        httpRequest(
            HttpMethods.put,
            "http://localhost:8081/user/update",
            {...user}
        )
            .then(response => resolve(response));
    });
}
