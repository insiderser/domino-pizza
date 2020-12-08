import {parseElementFromString} from "../parser.js"
import cartListItem from './cartListItem.js'
import emptyCart from './emptyCart.js'
import loadingIndicator from "./loadingIndicator.js"

/**
 * @param {CartState} state
 * @param {function(Product):void} onProductClicked
 * @param {function(Product):void} onQuantityIncrementClicked
 * @param {function(Product):void} onQuantityDecrementClicked
 * @param {function():void} onBuyClicked
 * @return {Element}
 */
const view = (state, onProductClicked, onQuantityIncrementClicked, onQuantityDecrementClicked, onBuyClicked) => {
    if (state.isLoading) {
        return loadingIndicator()
    }

    if (state.cartItems.length === 0) {
        return emptyCart()
    }

    const cartDom = parseElementFromString(`
        <div id="cart" class="container">
            <div class="row">
                <div class="d-flex justify-content-around col-12">
                    <div>Total price: ${state.totalPrice}</div>
                    <button class="buy-now-btn">Buy now</button>
                </div>
            </div>
        </div>
    `)

    cartDom.getElementsByClassName('buy-now-btn')[0].onclick = (ev) => {
        onBuyClicked()
        ev.stopPropagation()
    }

    state.cartItems
        .map(item => cartListItem(item, onProductClicked, onQuantityIncrementClicked, onQuantityDecrementClicked))
        .forEach(doc => cartDom.getElementsByClassName("row")[0].appendChild(doc))

    return cartDom
}

export default view
