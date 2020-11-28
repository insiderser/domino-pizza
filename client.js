const BASE_REST_URL = "https://my-json-server.typicode.com/insiderser/domino-pizza"

class Client {

    /**
     * @param {function(): void} onResourceNotFound
     * @param {function(string): void} onUnknownError
     */
    constructor({onResourceNotFound, onUnknownError}) {
        this.onResourceNotFound = onResourceNotFound
        this.onUnknownError = onUnknownError
    }

    getData(endpoint) {
        return fetch(`${BASE_REST_URL}/${endpoint}`)
            .then(response => {
                if (!response.ok) {
                    switch (response.status) {
                        case 404:
                            this.onResourceNotFound()
                            break

                        default:
                            this.onUnknownError(response.statusText)
                    }
                    throw new Error('Response was not OK: ' + response)
                }

                return response.json()
            })
    }
}

export default Client
