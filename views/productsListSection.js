/**
 * @param {[Product]} products
 * @return {string}
 */
const view = (products) => `
<div id="productsSection">
    ${products.map((product) => `
    <div class="product-item">
        <img class="product-image" src="${product.images[0]}" alt="">
        <span class="product-name">${product.id}</span>
        <span class="product-desc">${product.name}</span>
        <span class="product-weight">${product.weight} g</span>
        <div>
            <span class="product-price">${product.price} <span class="product-price-currency">uah</span></span>
            <button class="add-to-cart">To cart</button>
        </div>
    </div>
    `)}
</div>
`

export default view
