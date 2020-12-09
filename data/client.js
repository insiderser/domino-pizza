import {NoResourceFoundError} from "../error.js"

const BASE_REST_URL = "https://my-json-server.typicode.com/insiderser/domino-pizza"

class Client {

    /**
     * @param {string} endpoint
     * @return {Promise}
     */
    getData(endpoint) {
        return fetch(`${BASE_REST_URL}/${endpoint}`)
            .then(response => {
                if (!response.ok) {
                    if (response.status === 404) {
                        throw new NoResourceFoundError('No resource found ' + endpoint)
                    }
                    throw new Error('Response was not OK: ' + response)
                }

                return response.json()
            })
    }

    /**
     * @param {string} endpoint
     * @param {any} body
     * @return {Promise}
     */
    postData(endpoint, body = {}) {
        return fetch(`${BASE_REST_URL}/${endpoint}`, {
            method: 'POST',
            body: JSON.stringify(body)
        })
            .then(response => {
                if (!response.ok) {
                    if (response.status === 404) {
                        throw new NoResourceFoundError('No resource found ' + endpoint)
                    }
                    throw new Error('Response was not OK: ' + response)
                }

                return response.json()
            })
    }
}

export default Client
