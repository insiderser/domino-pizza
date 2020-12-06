import Controller from "./Controller.js"
import NavDestination from "../navigation/NavDestination.js"
import CategoriesRepository from "../data/CategoriesRepository.js"
import {NoResourceFoundError} from "../error.js"
import CategoryState from "../entities/CategoryState.js"
import categoryPage from "../views/categoryPage.js"

class CategoryController extends Controller {

    constructor(router, args, categoriesRepository = new CategoriesRepository()) {
        super(router, args, new CategoryState({isLoading: true, category: null}))

        categoriesRepository.getCategory(args)
            .then(data => this.updateState(state => {
                state.isLoading = false
                state.category = data
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
     * @param {CategoryState} state
     * @return {Element}
     */
    renderState(state) {
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

        return categoryPage(state, onProductClicked, onAddToCartClicked)
    }
}

export default CategoryController
