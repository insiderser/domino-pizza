class HomeState {
    /**
     * @param {boolean} isLoading
     * @param {[ProductCategoryWithProducts]} categories
     */
    constructor({isLoading, categories}) {
        this.isLoading = isLoading
        this.categories = categories
    }
}

export default HomeState
