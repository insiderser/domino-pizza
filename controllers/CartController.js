import CartState from "../entities/CartState.js"
import CartModel from "../model/CartModel.js"
import NavDestination from "../navigation/NavDestination.js"
import cartPage from '../views/cartPage.js'
import Controller from "./Controller.js"

class CartController extends Controller {

    constructor(router, args, cartModel = new CartModel()) {
        super(router, args, new CartState({isLoading: true, cartItems: Array(), totalPrice: 0}))
        this.cartModel = cartModel

        cartModel.getCartProducts()
            .subscribe((data => this.updateState(state => {
                state.isLoading = false
                state.cartItems = data
                state.totalPrice = data
                    .map(item => item.product.price * item.quantity)
                    .reduce((first, second) => first + second, 0)
                return state
            })), (err => {
                alert(err.message)
                console.log(err)
            }))
    }

    /**
     * @param {CartState} state
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
        const onQuantityIncrementClicked = product => {
            this.cartModel.addProduct(product)
        }

        /**
         * @param {Product} product
         */
        const onQuantityDecrementClicked = product => {
            this.cartModel.removeProduct(product)
        }

        const onBuyClicked = () => {
            this.router.navigateTo(NavDestination.order())
        }

        return cartPage(state, onProductClicked, onQuantityIncrementClicked, onQuantityDecrementClicked, onBuyClicked)
    }
}

export default CartController
