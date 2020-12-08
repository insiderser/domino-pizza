import CartRepository from "../data/CartRepository.js"
import ProductsRepository from "../data/ProductsRepository.js"
import CartProductItem from "../entities/CartProductItem.js"

const {map, switchMap} = rxjs.operators

class CartModel {

    constructor(productsRepository = new ProductsRepository(), cartRepository = new CartRepository()) {
        this.productsRepository = productsRepository
        this.cartRepository = cartRepository
    }

    /**
     * @return {Observable<[CartProductItem]>}
     */
    getCartProducts() {
        const cartItems = this.cartRepository.getCartItems()
        const remoteProducts = this.productsRepository.getAllProducts()
        return cartItems
            .pipe(map(items => this.associateQuantitiesByIds(items)))
            .pipe(switchMap(quantitiesByIds =>
                remoteProducts.then(products =>
                    products
                        .filter(product => quantitiesByIds[product.id] !== undefined)
                        .map(product => new CartProductItem(product, quantitiesByIds[product.id]))
                )))
    }

    /**
     * @param {[CartItem]} items
     * @return {Map<string, number>}
     */
    associateQuantitiesByIds(items) {
        const resultMap = new Map()
        items.forEach(item => resultMap[item.productId] = item.quantity)
        return resultMap
    }

    /**
     * @param {Product} product
     */
    addProduct(product) {
        this.cartRepository.addProduct(product.id)
    }

    /**
     * @param {Product} product
     */
    removeProduct(product) {
        this.cartRepository.removeProduct(product.id)
    }
}

export default CartModel
