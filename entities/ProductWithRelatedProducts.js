class ProductWithRelatedProducts {
    /**
     * @param {Product} product
     * @param {[Product]} relatedProducts
     */
    constructor(product, relatedProducts) {
        this.product = product
        this.relatedProducts = relatedProducts
    }
}

export default ProductWithRelatedProducts
