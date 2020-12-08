import CartLocalStorage from "./CartLocalStorage.js"

const {map} = rxjs.operators

class CartRepository {

    constructor(storage = CartLocalStorage) {
        this.storage = storage
    }

    /**
     * @return {Observable<number>}
     */
    getProductsCount() {
        return this.storage.asObservable()
            .pipe(map(cart => Object.keys(cart).length))
    }

    /**
     * @param {Product} product
     * @param {number} quantity
     */
    addProduct(product, quantity) {
        this.storage.addOrUpdate(product.id, quantity)
    }
}

export default CartRepository
