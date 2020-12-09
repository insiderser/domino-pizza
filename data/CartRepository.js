import CartItem from '../entities/CartItem.js'
import CartLocalStorage from "./CartLocalStorage.js"

const {map} = rxjs.operators

class CartRepository {

    constructor(storage = CartLocalStorage) {
        this.storage = storage
    }

    /**
     * @return {Observable<[CartItem]>}
     */
    getCartItems() {
        return this.storage.asObservable()
            .pipe(map(cart =>
                Object.keys(cart).map(key => new CartItem(key, cart[key]))
            ))
    }

    /**
     * @return {Observable<number>}
     */
    getProductsCount() {
        return this.storage.asObservable()
            .pipe(map(cart =>
                Object.keys(cart)
                    .map(key => cart[key])
                    .reduce((first, second) => first + second, 0)
            ))
    }

    /**
     * @param {string} productId
     */
    addProduct(productId) {
        this.storage.addOrIncrement(productId)
    }

    /**
     * @param {string} productId
     */
    removeProduct(productId) {
        this.storage.removeOrDecrement(productId)
    }

    clear() {
        this.storage.clear()
    }
}

export default CartRepository
