import Client from "../client.js"
import ProductCategoryWithProducts from "../model/ProductCategoryWithProducts.js"
import Product from "../model/Product.js"
import ProductCategory from "../model/ProductCategory.js"

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
}

export default CategoriesRepository
