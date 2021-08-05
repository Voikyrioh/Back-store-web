import {HttpMethods, httpRequest} from "../NetworkService";

export function getAllUsers() {
    return new Promise((resolve) => {
        httpRequest(
            HttpMethods.get,
            "http://localhost:8081/users/",
        )
            .then(response => resolve(response?.body));
    });
}
