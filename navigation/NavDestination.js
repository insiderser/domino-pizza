class NavDestination {
    constructor(hash, controllerName) {
        this.hash = hash
        this.controllerName = controllerName
    }

    static home() {
        return new NavDestination('', "HomeController")
    }

    static category(categoryId) {
        return new NavDestination(`categories/${categoryId}`, 'CategoryController')
    }

    static product(productId) {
        return new NavDestination(`products/${productId}`, 'ProductController')
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

        return null
    }
}

export default NavDestination
