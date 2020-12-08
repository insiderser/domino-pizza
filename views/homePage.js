import {parseElementFromString} from "../parser.js"
import loadingIndicator from "./loadingIndicator.js"
import productsListSection from "./productsListSection.js"

/**
 * @param {HomeState} state
 * @param {function(ProductCategoryWithProducts):void} onCategoryClicked
 * @param {function(Product):void} onProductClicked
 * @param {function(Product):void} onAddToCartClicked
 * @return {Element}
 */
const view = (state, onCategoryClicked, onProductClicked, onAddToCartClicked) => {
    if (state.isLoading) {
        return loadingIndicator()
    }

    const categoriesDom = parseElementFromString(`
        <div id="categories" class="container">
            <div class="row">
                
            </div>
        </div>
    `)

    state.categories
        .map(categoryWithProducts => categoryItem(categoryWithProducts, onCategoryClicked, onProductClicked, onAddToCartClicked))
        .forEach(doc => categoriesDom.getElementsByClassName("row")[0].appendChild(doc))

    return categoriesDom
}

/**
 * @param {ProductCategoryWithProducts} categoryWithProducts
 * @param {function(ProductCategoryWithProducts):void} onCategoryClicked
 * @param {function(Product):void} onProductClicked
 * @param {function(Product):void} onAddToCartClicked
 * @return {Element}
 */
function categoryItem(categoryWithProducts, onCategoryClicked, onProductClicked, onAddToCartClicked) {
    const category = categoryWithProducts.category
    const products = categoryWithProducts.products

    const categoryDom = parseElementFromString(`
            <div class="category col-12 container">
                <span class="category-title h4">${category.name}</span>
            </div>
        `)

    categoryDom.onclick = (ev) => {
        onCategoryClicked(categoryWithProducts)
        ev.stopPropagation()
    }

    const productsSection = productsListSection(products, onProductClicked, onAddToCartClicked)
    categoryDom.appendChild(productsSection)

    return categoryDom
}

export default view
