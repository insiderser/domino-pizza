import CartRepository from '../data/CartRepository.js'
import Client from '../data/client.js'

const {first} = rxjs.operators

class OrdersModel {
    constructor(client = new Client(), cartRepository = new CartRepository()) {
        this.client = client
        this.cartRepository = cartRepository
    }

    /**
     * @param {UserShipCredentials} credentials
     * @return {Observable<number>}
     */
    submitOrder(credentials) {
        return this.cartRepository.getCartItems()
            .pipe(first())
            .toPromise()
            .then(cartItems => {
                credentials.cartItems = cartItems
                return credentials
            })
            .then(data => this.client.postData('orders', data))
            .then(response => response.id)
            .then(newOrderId => {
                this.cartRepository.clear()
                return newOrderId
            })
    }
}

export default OrdersModel
