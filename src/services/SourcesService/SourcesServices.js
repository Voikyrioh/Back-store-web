export function getAllSourcesInformations() {
    return fetch("http://localhost:8080/sources/",
        {
            headers: {
                "access-control-allow-origin" : "*",
                "Content-type": "application/json; charset=UTF-8"
            }})
        .then(response => response.json());
}