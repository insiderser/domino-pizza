import productsListSection from "./productsListSection.js"

/**
 * @param {[Product]} products
 * @return {string}
 */
const view = (products) => `
<div id="products">
    ${productsListSection(products)}
</div>
`

export default view
