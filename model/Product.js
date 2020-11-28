class Product {
    /**
     * @param {string} id
     * @param {string} name
     * @param {string} description
     * @param {number} price
     * @param {[string]} images
     * @param {string} productCategoryId
     */
    constructor(id, name, description, price, images, productCategoryId) {
        this.id = id
        this.name = name
        this.description = description
        this.price = price
        this.images = images
        this.productCategoryId = productCategoryId
    }
}

export default Product
