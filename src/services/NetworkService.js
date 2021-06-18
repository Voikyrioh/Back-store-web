/**
 * @param {Response} response
 * @return {Promise}
 */
export function getJsonBody(response) {
    return new Promise((resolve, reject) => {
        response.blob().then(responseBlob => {
            responseBlob.text().then(responseBody => {
                try {
                    resolve(JSON.parse(responseBody))
                } catch (e) {
                    reject(e);
                }
            });
        })
    })
}

export function getDefaultHeaders(method, body) {
    const requestOptions = {
        method,
        mode: 'cors',
        headers: {'Content-Type':'application/json'},
        credentials: 'include'
    }

    if (body) {
        requestOptions.body = JSON.stringify(body)
    }
    return requestOptions;
}