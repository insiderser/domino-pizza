import {parseElementFromString} from "../parser.js"
import loadingIndicator from "./loadingIndicator.js"
import relatedProductsSection from "./relatedProductsSection.js"

/**
 * @param {ProductState} state
 * @param {function(Product):void} onRelatedProductClicked
 * @param {function(Product):void} onAddToCartClicked
 * @return {Element}
 */
const view = (state, onRelatedProductClicked, onAddToCartClicked) => {
    if (state.isLoading) {
        return loadingIndicator()
    }

    const product = state.productWithRelated.product
    const relatedProducts = state.productWithRelated.relatedProducts

    const productDom = parseElementFromString(`
        <div id="product-details-container" class="container d-flex flex-column">
            <span class="product-name h4">${product.name}</span>
            <span class="product-desc">${product.description}</span>
            <div class="d-flex flex-row justify-content-between">
                <span class="product-price">${product.price} <span class="product-price-currency">uah</span></span>
                <button class="add-to-cart">To cart</button>
            </div>
        </div>
    `)

    for (const addToCartBtn of productDom.getElementsByClassName('add-to-cart')) {
        addToCartBtn.onclick = (ev) => {
            onAddToCartClicked(product)
            ev.stopPropagation()
        }
    }

    product.images
        .map(image => `
            <img class="product-image" src="${image}" alt="">
        `)
        .map(parseElementFromString)
        .forEach(dom => productDom.appendChild(dom))

    const relatedProductsDom = relatedProductsSection(relatedProducts, onRelatedProductClicked, onAddToCartClicked)
    productDom.appendChild(relatedProductsDom)

    return productDom
}

export default view
