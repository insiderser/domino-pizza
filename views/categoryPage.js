import {parseElementFromString} from "../parser.js"
import loadingIndicator from "./loadingIndicator.js"
import productsListSection from "./productsListSection.js"

/**
 * @param {CategoryState} state
 * @param {function(Product):void} onProductClicked
 * @param {function(Product):void} onAddToCartClicked
 * @return {Element}
 */
const view = (state, onProductClicked, onAddToCartClicked) => {
    if (state.isLoading) {
        return loadingIndicator()
    }

    const category = state.category.category
    const products = state.category.products

    const categoryDom = parseElementFromString(`
        <div class="category container d-flex flex-column">
            <span class="category-title h4">${category.name}</span>
            <span class="category-description">${category.description}</span>
        </div>
    `)

    const productsDom = productsListSection(products, onProductClicked, onAddToCartClicked)
    categoryDom.appendChild(productsDom)

    return categoryDom
}

export default view
