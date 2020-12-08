import {parseElementFromString} from "../parser.js"

/**
 * @param {CartProductItem} item
 * @param {function(Product):void} onProductClicked
 * @param {function(Product):void} onQuantityIncrementClicked
 * @param {function(Product):void} onQuantityDecrementClicked
 * @return {Element}
 */
const view = (item, onProductClicked, onQuantityIncrementClicked, onQuantityDecrementClicked) => {
    const product = item.product

    const cartItemDocument = parseElementFromString(`
            <div class="product-item col-md-4 col-sm-6 col-12 card justify-content-between">
                <div class="d-flex flex-column">
                    <img class="product-image" src="${product.images[0]}" alt="">
                    <span class="product-name h6">${product.name}</span>
                    <span class="product-desc">${product.description}</span>
                </div>
                <div class="d-flex flex-row justify-content-between">
                    <span class="product-price">${product.price} <span class="product-price-currency">uah</span></span>
                    <div>
                        <button class="decrement"> - </button>
                        <span class="cart-quantity">${item.quantity}</span>
                        <button class="increment"> + </button>
                    </div>
                </div>
            </div>
        `)

    cartItemDocument.onclick = (ev) => {
        onProductClicked(product)
        ev.stopPropagation()
    }

    for (const incrementBtn of cartItemDocument.getElementsByClassName('increment')) {
        incrementBtn.onclick = (ev) => {
            onQuantityIncrementClicked(product)
            ev.stopPropagation()
        }
    }
    for (const decrementBtn of cartItemDocument.getElementsByClassName('decrement')) {
        decrementBtn.onclick = (ev) => {
            onQuantityDecrementClicked(product)
            ev.stopPropagation()
        }
    }

    return cartItemDocument
}

export default view
