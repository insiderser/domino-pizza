const BASE_REST_URL = "https://my-json-server.typicode.com/insiderser/domino-pizza"

class Client {
    getData(endpoint) {
        return fetch(`${BASE_REST_URL}/${endpoint}`)
            .then(response => response.json())
    }
}

export default Client
