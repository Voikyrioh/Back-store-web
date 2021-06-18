import {getDefaultHeaders} from "../NetworkService";

export function getAllProductInformations() {
    return fetch(
        "http://localhost:8081/products/",
            getDefaultHeaders('GET')
        )
        .then(response => response.json());
}