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
    addOrIncrement: (itemId) => {
        const cart = getCart()
        if (cart[itemId]) {
            cart[itemId]++
        } else {
            cart[itemId] = 1
        }
        saveCart(cart)
    },

    /**
     * @param {string} itemId
     */
    removeOrDecrement: (itemId) => {
        const cart = getCart()
        if (cart[itemId] > 1) {
            cart[itemId]--
        } else {
            delete cart[itemId]
        }
        saveCart(cart)
    },

    clear: () => saveCart({})
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
