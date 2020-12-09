import {parseElementFromString} from "../parser.js"

/**
 * @param {number} orderId
 * @return {Element}
 */
const view = (orderId) => parseElementFromString(`
    <div class="center-on-screen">
        <p>Your order ${orderId} was created successfully.</p>
        <p>Await call from our manager to confirm the order.</p>
    </div>
`)

export default view
