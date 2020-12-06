class ProductState {
    /**
     * @param {boolean} isLoading
     * @param {ProductWithRelatedProducts|null} productWithRelated
     */
    constructor({isLoading, productWithRelated}) {
        this.isLoading = isLoading
        this.productWithRelated = productWithRelated
    }
}

export default ProductState
