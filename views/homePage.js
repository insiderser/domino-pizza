import productsListSection from "./productsListSection.js"
import {parseElementFromString} from "../parser.js"

/**
 * @param {HomeState} data
 * @param {function(ProductCategoryWithProducts):void} onCategoryClicked
 * @param {function(Product):void} onProductClicked
 * @param {function(Product):void} onAddToCartClicked
 * @return {Element}
 */
const view = (data, onCategoryClicked, onProductClicked, onAddToCartClicked) => {
    const categoriesDom = parseElementFromString(`
        <div id="categories"></div>
    `)

    data.categories
        .map(categoryWithProducts => {
            const category = categoryWithProducts.category
            const products = categoryWithProducts.products

            const categoryDom = parseElementFromString(`
                <div class="category">
                    <span class="category-title">${category.name}</span>
                </div>
            `)

            categoryDom.onclick = (ev) => {
                onCategoryClicked(categoryWithProducts)
                ev.stopPropagation()
            }

            const productsSection = productsListSection(products, onProductClicked, onAddToCartClicked)
            categoryDom.appendChild(productsSection)

            return categoryDom
        })
        .forEach(doc => categoriesDom.appendChild(doc))

    return categoriesDom
}

export default view
