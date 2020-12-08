import Product from "../entities/Product.js"
import ProductCategory from "../entities/ProductCategory.js"
import ProductCategoryWithProducts from "../entities/ProductCategoryWithProducts.js"
import Client from "./client.js"

class CategoriesRepository {
    constructor(client = new Client()) {
        this.client = client
    }

    /**
     * @return {Promise<[ProductCategoryWithProducts]>}
     */
    getCategoriesWithProducts() {
        return this.client.getData('db')
            .then(data => this.groupProductsByCategories(data))
    }

    groupProductsByCategories(data) {
        return data.productCategories.map(category => {
            const products = data.products
                .filter(product => product.productCategoryId === category.id)

            category.prototype = ProductCategory.prototype
            products.forEach(product => product.prototype = Product.prototype)

            return new ProductCategoryWithProducts(category, products)
        })
    }

    /**
     * @param {string} categoryId
     * @return {Promise<ProductCategoryWithProducts>}
     */
    getCategory(categoryId) {
        return this.client.getData(`productCategories/${categoryId}?_embed=products`)
            .then(data => new ProductCategoryWithProducts(
                new ProductCategory(data.id, data.name, data.description),
                data.products
            ))
    }
}

export default CategoriesRepository
