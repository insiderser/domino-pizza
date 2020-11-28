import productsListSection from "./productsListSection.js"

/**
 * @param {HomeData} data
 * @return {string}
 */
const view = (data) => `
<div id="categories">
    ${data.productCategories.map(category => {
        console.log(category)
        console.log(data.products)
        const productsForCategory = data.products.filter(product => product.productCategoryId === category.id)
        console.log(productsForCategory)

        return `
        <div class="category">
            <span class="category-title">${category.name}</span>
            ${productsListSection(productsForCategory)}
        </div>
        `
    })
    .join('\n')}
</div>
`

export default view
