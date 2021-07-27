import {HttpMethods, httpRequest} from "../NetworkService";

export function getAllProductInformations() {
    return new Promise((resolve) => {
        httpRequest(
            HttpMethods.get,
            "http://localhost:8081/products/",
        )
            .then(response => resolve(response?.body));
    });
}