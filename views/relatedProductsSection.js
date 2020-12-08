import {parseElementFromString} from "../parser.js"
import productsListSection from "./productsListSection.js"

/**
 * @param {[Product]} relatedProducts
 * @param {function(Product):void} onProductClicked
 * @param {function(Product):void} onAddToCartClicked
 * @return {Element}
 */
const view = (relatedProducts, onProductClicked, onAddToCartClicked) => {
    const dom = parseElementFromString(`
        <div class="related-products-container">
            <span class="h6">You may also like:</span>
        </div>
    `)

    const productsDom = productsListSection(relatedProducts, onProductClicked, onAddToCartClicked)
    dom.appendChild(productsDom)

    return dom
}

export default view
