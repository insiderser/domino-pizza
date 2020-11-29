class HomeState {
    /**
     * @param {boolean} isLoading
     * @param {[ProductCategoryWithProducts]} categories
     */
    constructor({isLoading, categories}) {
        // TODO: add loading indicators
        this.isLoading = isLoading
        this.categories = categories
    }
}

export default HomeState
