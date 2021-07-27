/**
 * @typedef {Object} RequestResponse
 * @property {string|undefined} error
 * @property {*|undefined} full
 * @property {Object|undefined} body
 */

/**
 * @typedef {string} HttpMethod
 */
export const HttpMethods = {
    get: 'GET',
    post: 'POST',
    put: 'PUT',
    path: 'PATCH',
    delete: 'DELETE',
    head: 'HEAD',
}

Object.freeze(HttpMethods);

/**
 * @param {Response} response
 * @return {Promise}
 */
function getJsonBody(response) {
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

function getDefaultHeaders(method, body) {
    const requestOptions = {
        mode: 'cors',
        headers: {
            "access-control-allow-origin" : "*",
            "Content-type": "application/json"
        },
        credentials: 'include'
    }

    if (body) {
        requestOptions.body = JSON.stringify(body)
    }
    return requestOptions;
}


/**
 * @param {HttpMethod} method - Method from HttpMethods Object
 * @param {string} url
 * @param {Object} [body]
 * @param {RequestInit} [options]
 * @return {Promise<RequestResponse>}
 */
export function httpRequest(method, url, body, options) {
    if (!HttpMethods.hasOwnProperty(method.toLowerCase())) {
        return new Promise((resolve, reject) => {reject({error: 'wrong method'})});
    }

    options = {
        method,
        ...getDefaultHeaders(method,body),
        ...options,
    };

   return new Promise((resolve, reject) => {
       fetch(url, options).then(httpResponse => {
           if (httpResponse.status === 200 && httpResponse?.body) {
               getJsonBody(httpResponse).then(jsonBody => {
                   resolve({full: httpResponse, body: jsonBody});
               }).catch(e => {
                   console.error(e);
                   resolve({full: httpResponse});
               })
           } else {
               resolve({full: httpResponse});
           }
       }).catch(error => reject(error));
   })
}