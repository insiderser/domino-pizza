import {parseElementFromString} from "../parser.js"

/**
 * @param {[Product]} products
 * @param {function(Product):void} onProductClicked
 * @param {function(Product):void} onAddToCartClicked
 * @return {Element}
 */
const view = (products, onProductClicked, onAddToCartClicked) => {
    const productsListSection = parseElementFromString(`
        <div class="productsListSection"></div>
    `)

    products
        .map((product) => {
            const productItemDocument = parseElementFromString(`
                <div class="product-item">
                    <img class="product-image" src="${product.images[0]}" alt="">
                    <span class="product-name">${product.id}</span>
                    <span class="product-desc">${product.name}</span>
                    <div>
                        <span class="product-price">${product.price} <span class="product-price-currency">uah</span></span>
                        <button class="add-to-cart">To cart</button>
                    </div>
                </div>
            `)

            productItemDocument.onclick = (ev) => {
                onProductClicked(product)
                ev.stopPropagation()
            }

            for (const addToCartBtn of productItemDocument.getElementsByClassName('add-to-cart')) {
                addToCartBtn.onclick = (ev) => {
                    onAddToCartClicked(product)
                    ev.stopPropagation()
                }
            }

            return productItemDocument
        })
        .forEach(document => productsListSection.appendChild(document))

    return productsListSection
}

export default view
