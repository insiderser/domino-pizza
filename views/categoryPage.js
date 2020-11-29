import productsListSection from "./productsListSection.js"
import {parseElementFromString} from "../parser.js"

/**
 * @param {ProductCategoryWithProducts} categoryWithProducts
 * @param {function(Product):void} onProductClicked
 * @param {function(Product):void} onAddToCartClicked
 * @return {Element}
 */
const view = (categoryWithProducts, onProductClicked, onAddToCartClicked) => {
    const category = categoryWithProducts.category
    const products = categoryWithProducts.products

    const categoryDom = parseElementFromString(`
        <div class="category">
            <span class="category-title">${category.name}</span>
            <span class="category-description">${category.description}</span>
        </div>
    `)

    const productsDom = productsListSection(products, onProductClicked, onAddToCartClicked)
    categoryDom.appendChild(productsDom)

    return categoryDom
}

export default view
