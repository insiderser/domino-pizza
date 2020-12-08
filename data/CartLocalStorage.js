const {BehaviorSubject} = rxjs

const CART_KEY = "cart"

const CartLocalStorage = {
    getCart: () => getCart(),

    /**
     * @return {Observable}
     */
    asObservable: () => cartsSubject.asObservable(),

    /**
     * @param {string} itemId
     */
    addToCart: (itemId) => {
        const cart = getCart()
        if (cart[itemId]) {
            cart[itemId]++
        } else {
            cart[itemId] = 1
        }
        saveCart(cart)
    },

    /**
     * @param {number} itemId
     */
    remove: (itemId) => {
        const cart = getCart()
        cart[itemId] = undefined
        saveCart(cart)
    },

    clear: () => saveCart({}),
}

const cartsSubject = new BehaviorSubject(getCart())

function getCart() {
    const asJson = localStorage.getItem(CART_KEY) ?? '{}'
    return JSON.parse(asJson)
}

function saveCart(cart) {
    const asJson = JSON.stringify(cart)
    localStorage.setItem(CART_KEY, asJson)

    cartsSubject.next(cart)
}

export default CartLocalStorage
