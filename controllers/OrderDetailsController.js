import orderDetailsPage from '../views/orderDetailsPage.js'
import Controller from "./Controller.js"

class OrderDetailsController extends Controller {

    constructor(router, args) {
        super(router, args, args)
    }

    /**
     * @param {number} orderId
     * @return {Element}
     */
    renderState(orderId) {
        return orderDetailsPage(orderId)
    }
}

export default OrderDetailsController
