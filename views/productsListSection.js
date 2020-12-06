import {parseElementFromString} from "../parser.js"

/**
 * @param {[Product]} products
 * @param {function(Product):void} onProductClicked
 * @param {function(Product):void} onAddToCartClicked
 * @return {Element}
 */
const view = (products, onProductClicked, onAddToCartClicked) => {
    const productsListSection = parseElementFromString(`
        <div class="productsListSection row"></div>
    `)

    products
        .map((product) => productItem(product, onProductClicked, onAddToCartClicked))
        .forEach(document => productsListSection.appendChild(document))

    return productsListSection
}

/**
 * @param {Product} product
 * @param {function(Product):void} onProductClicked
 * @param {function(Product):void} onAddToCartClicked
 * @return {Element}
 */
function productItem(product, onProductClicked, onAddToCartClicked) {
    const productItemDocument = parseElementFromString(`
            <div class="product-item col-md-4 col-sm-6 col-12 card justify-content-between">
                <div class="d-flex flex-column">
                    <img class="product-image" src="${product.images[0]}" alt="">
                    <span class="product-name h6">${product.name}</span>
                    <span class="product-desc">${product.description}</span>
                </div>
                <div class="d-flex flex-row justify-content-between">
                    <span class="product-price">${product.price} <span class="product-price-currency">uah</span></span>
                    <button class="add-to-cart">To cart</button>
                </div>
            </div>
        `)

    productItemDocument.onclick = (ev) => {
        onProductClicked(product)
        ev.stopPropagation()
    }

    for (const addToCartBtn of productItemDocument.getElementsByClassName('add-to-cart')) {
        addToCartBtn.onclick = (ev) => {
            onAddToCartClicked(product)
            ev.stopPropagation()
        }
    }

    return productItemDocument
}

export default view
