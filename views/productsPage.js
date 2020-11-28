/**
 * @param {[Product]} products
 * @return {string}
 */
const view = (products) => `
<div id="products">
    ${products.map((product) => `
    <div class="product-item">
        <span class="product-name">${product.id}</span>
        <span class="product-desc">${product.name}</span>
    </div>
    `)}
</div>
`

export default view
