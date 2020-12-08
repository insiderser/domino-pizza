import CartRepository from "../data/CartRepository.js"
import CategoriesRepository from "../data/CategoriesRepository.js"
import CategoryState from "../entities/CategoryState.js"
import {NoResourceFoundError} from "../error.js"
import NavDestination from "../navigation/NavDestination.js"
import categoryPage from "../views/categoryPage.js"
import Controller from "./Controller.js"

class CategoryController extends Controller {

    constructor(router, args, categoriesRepository = new CategoriesRepository(), cartRepository = new CartRepository()) {
        super(router, args, new CategoryState({isLoading: true, category: null}))
        this.cartRepository = cartRepository

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
            this.cartRepository.addProduct(product.id)
        }

        return categoryPage(state, onProductClicked, onAddToCartClicked)
    }
}

export default CategoryController
