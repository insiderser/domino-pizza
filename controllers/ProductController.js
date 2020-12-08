import CartRepository from "../data/CartRepository.js"
import ProductsRepository from "../data/ProductsRepository.js"
import ProductState from "../entities/ProductState.js"
import {NoResourceFoundError} from "../error.js"
import NavDestination from "../navigation/NavDestination.js"
import productPage from "../views/productPage.js"
import Controller from "./Controller.js"

class CategoryController extends Controller {

    constructor(router, args, productsRepository = new ProductsRepository(), cartRepository = new CartRepository()) {
        super(router, args, new ProductState({isLoading: true, productWithRelated: null}))
        this.cartRepository = cartRepository

        productsRepository.getProduct(args)
            .then(data => this.updateState(state => {
                state.isLoading = false
                state.productWithRelated = data
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
     * @param {ProductState} state
     * @return {Element}
     */
    renderState(state) {
        /**
         * @param {Product} product
         */
        const onRelatedProductClicked = product => {
            this.router.navigateTo(NavDestination.product(product.id))
        }

        /**
         * @param {Product} product
         */
        const onAddToCartClicked = product => {
            this.cartRepository.addProduct(product.id)
        }

        return productPage(state, onRelatedProductClicked, onAddToCartClicked)
    }
}

export default CategoryController
