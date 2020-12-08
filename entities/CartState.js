class CartState {
    /**
     * @param {boolean} isLoading
     * @param {[CartProductItem]} cartItems
     * @param {number} totalPrice
     */
    constructor({isLoading, cartItems, totalPrice}) {
        this.isLoading = isLoading
        this.cartItems = cartItems
        this.totalPrice = totalPrice
    }
}

export default CartState
