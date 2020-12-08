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
            .pipe(map(cart =>
                Object.keys(cart)
                    .map(key => cart[key])
                    .reduce((first, second) => first + second, 0)
            ))
    }

    /**
     * @param {Product} product
     */
    addProduct(product) {
        this.storage.addToCart(product.id)
    }
}

export default CartRepository
