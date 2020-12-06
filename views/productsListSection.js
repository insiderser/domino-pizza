import {parseElementFromString} from "../parser.js"
import productListItem from "./productListItem.js"

/**
 * @param {[Product]} products
 * @param {function(Product):void} onProductClicked
 * @param {function(Product):void} onAddToCartClicked
 * @return {Element}
 */
const view = (products, onProductClicked = () => {}, onAddToCartClicked = () => {}) => {
    const productsListSection = parseElementFromString(`
        <div class="productsListSection row"></div>
    `)

    products
        .map((product) => productListItem(product, onProductClicked, onAddToCartClicked))
        .forEach(document => productsListSection.appendChild(document))

    return productsListSection
}

export default view
