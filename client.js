import {BASE_REST_URL} from "./Config.js"

class Client {
    getData(endpoint) {
        return fetch(`${BASE_REST_URL}/${endpoint}`)
            .then(response => response.json())
    }
}

export default Client
