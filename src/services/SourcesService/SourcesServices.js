export function getAllProductInformations() {
    return fetch("http://localhost:8081/products/",
        {
            headers: {
                "access-control-allow-origin" : "*",
                "Content-type": "application/json; charset=UTF-8"
            }})
        .then(response => response.json());
}