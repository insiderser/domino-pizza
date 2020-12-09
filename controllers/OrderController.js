import OrdersModel from '../model/OrdersModel.js'
import NavDestination from '../navigation/NavDestination.js'
import orderPage from '../views/orderPage.js'
import Controller from "./Controller.js"

class OrderController extends Controller {

    constructor(router, args, orderRepository = new OrdersModel()) {
        super(router, args, null)
        this.orderRepository = orderRepository
    }

    /**
     * @param {null} state
     * @return {Element}
     */
    renderState(state) {
        /**
         * @param {UserShipCredentials} credentials
         */
        const onSubmit = (credentials) => {
            this.orderRepository.submitOrder(credentials)
                .then((newOrderId) => this.router.navigateTo(NavDestination.orderDetails(newOrderId)))
        }

        return orderPage(onSubmit)
    }
}

export default OrderController
