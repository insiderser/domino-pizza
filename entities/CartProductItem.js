class CartProductItem {
    /**
     * @param {Product} product
     * @param {number} quantity
     */
    constructor(product, quantity) {
        if (quantity <= 0) {
            throw new RangeError('Quantity has to be positive')
        }
        if (quantity % 1 !== 0) {
            throw new RangeError('Quantity has to be an integer')
        }

        this.product = product
        this.quantity = quantity
    }
}

export default CartProductItem
