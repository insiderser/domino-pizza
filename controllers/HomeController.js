import Controller from "./Controller.js"
import HomeState from "../model/HomeState.js"
import homePage from "../views/homePage.js"
import NavDestination from "../navigation/NavDestination.js"
import CategoriesRepository from "../repo/CategoriesRepository.js"
import {NoResourceFoundError} from "../error.js"

class HomeController extends Controller {

    constructor(router, categoriesRepository = new CategoriesRepository()) {
        super(router, new HomeState({isLoading: true, categories: Array()}))

        categoriesRepository.getCategoriesWithProducts()
            .then(data => this.updateState(state => {
                state.categories = data
                return state
            }))
            .catch(err => {
                alert(err.message)
                if (err instanceof NoResourceFoundError) {
                    router.navigateTo(NavDestination.home())
                }
            })
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
            // TODO
        }

        return homePage(state, onCategoryClicked, onProductClicked, onAddToCartClicked)
    }
}

export default HomeController
