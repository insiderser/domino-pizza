import CartRepository from "../data/CartRepository.js"
import CategoriesRepository from "../data/CategoriesRepository.js"
import HomeState from "../entities/HomeState.js"
import NavDestination from "../navigation/NavDestination.js"
import homePage from "../views/homePage.js"
import Controller from "./Controller.js"

class HomeController extends Controller {

    constructor(router, args, categoriesRepository = new CategoriesRepository(), cartRepository = new CartRepository()) {
        super(router, args, new HomeState({isLoading: true, categories: Array()}))
        this.cartRepository = cartRepository

        categoriesRepository.getCategoriesWithProducts()
            .then(data => this.updateState(state => {
                state.isLoading = false
                state.categories = data
                return state
            }))
            .catch(err => alert(err.message))
    }

    /**
     * @param {HomeState} state
     * @return {Element}
     */
    renderState(state) {
        /**
         * @param {ProductCategoryWithProducts} categoryWithProducts
         */
        const onCategoryClicked = categoryWithProducts => {
            this.router.navigateTo(NavDestination.category(categoryWithProducts.category.id))
        }

        /**
         * @param {Product} product
         */
        const onProductClicked = product => {
            this.router.navigateTo(NavDestination.product(product.id))
        }

        /**
         * @param {Product} product
         */
        const onAddToCartClicked = product => {
            this.cartRepository.addProduct(product.id)
        }

        return homePage(state, onCategoryClicked, onProductClicked, onAddToCartClicked)
    }
}

export default HomeController
