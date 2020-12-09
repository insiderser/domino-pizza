class NavDestination {
    constructor(hash, controllerName, args = null) {
        this.hash = hash
        this.controllerName = controllerName
        this.args = args
    }

    static home() {
        return new NavDestination('', "HomeController")
    }

    static category(categoryId) {
        return new NavDestination(`categories/${categoryId}`, 'CategoryController', categoryId)
    }

    static product(productId) {
        return new NavDestination(`products/${productId}`, 'ProductController', productId)
    }

    static cart() {
        return new NavDestination('cart', 'CartController')
    }

    static order() {
        return new NavDestination('order', 'OrderController')
    }

    static orderDetails(orderId) {
        // TODO: implement. Order details info should be passed as a parameter.
        return new NavDestination(`order/${orderId}`, 'OrderDetailsController', orderId)
    }

    /**
     * @param {string} hash
     * @return {null|NavDestination}
     */
    static findDestinationForHash(hash) {
        if (hash.length === 0) {
            return this.home()
        }
        if (/^categories\/\d+$/.test(hash)) {
            const id = hash.split('/')[1]
            return this.category(id)
        }
        if (/^products\/\d+$/.test(hash)) {
            const id = hash.split('/')[1]
            return this.product(id)
        }
        if (/^cart\/?$/.test(hash)) {
            return this.cart()
        }
        if (/^order\/?$/.test(hash)) {
            return this.order()
        }
        if (/^order\/\d+$/.test(hash)) {
            const id = hash.split('/')[1]
            return this.orderDetails(id)
        }

        return null
    }
}

export default NavDestination
