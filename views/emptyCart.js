import {parseElementFromString} from '../parser.js'

/**
 * @return {Element}
 */
const view = () => parseElementFromString(`
    <div class="center-on-screen">
        <p class="empty-cart-message">Your cart looks empty.</p>
        <a href="#">Home</button>
    </div>
`)

export default view
