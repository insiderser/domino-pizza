class CategoryState {
    /**
     * @param {boolean} isLoading
     * @param {ProductCategoryWithProducts|null} category
     */
    constructor({isLoading, category}) {
        this.isLoading = isLoading
        this.category = category
    }
}

export default CategoryState
