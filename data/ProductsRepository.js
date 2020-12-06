import Client from "./client.js"
import {NoResourceFoundError} from "../error.js"
import ProductWithRelatedProducts from "../entities/ProductWithRelatedProducts.js"

class ProductsRepository {
    constructor(client = new Client()) {
        this.client = client
    }

    /**
     * @param {string} productId
     * @return {Promise<ProductWithRelatedProducts>}
     */
    getProduct(productId) {
        return this.client.getData(`products/`)
            .then(products => {
                const productsByIds = this.associateProductsByIds(products)
                const mainProduct = productsByIds[productId]

                if (!mainProduct) {
                    throw new NoResourceFoundError(`Cannot find product for ID ${productId}`)
                }

                const relatedProducts = mainProduct.relatedProductIds
                    .map(id => {
                        const product = productsByIds[id]
                        if (!product) {
                            throw new NoResourceFoundError(`Cannot find product for ID ${id}`)
                        }
                        return product
                    })

                return new ProductWithRelatedProducts(mainProduct, relatedProducts)
            })
    }

    /**
     * @param {Product} products
     * @return {Map<string, Product>}
     */
    associateProductsByIds(products) {
        const resultMap = new Map()
        products.forEach(product => resultMap[product.id] = product)
        return resultMap
    }
}

export default ProductsRepository
