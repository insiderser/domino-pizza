class Client {
    getData(endpoint) {
        return fetch(`http://my-json-server.typicode.com/zahar-g/test-json/${endpoint}`)
        .then(response => response.json())
    }
}

export default Client
