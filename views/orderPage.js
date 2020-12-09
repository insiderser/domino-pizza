import UserShipCredentials from '../entities/UserShipCredentials.js'
import {parseElementFromString} from "../parser.js"

// language=RegExp
const phonePattern = '(\\+[0-9]+[\\- .]*)?(\\([0-9]+\\)[\\- .]*)?([0-9][0-9\\- .]+[0-9])'
// language=RegExp
const emailPattern = '[a-zA-Z0-9+._%\\-]{1,256}@[a-zA-Z0-9][a-zA-Z0-9\\-]{0,64}(\\.[a-zA-Z0-9][a-zA-Z0-9\\-]{0,25})+'

/**
 * @param {function(UserShipCredentials):void} onSubmit
 * @return {Element}
 */
const view = (onSubmit) => {
    const categoriesDom = parseElementFromString(`
        <form>
            <label for="phone-number-input">Phone number: </label>
            <input id="phone-number-input" type="tel" name="phone" required pattern="${phonePattern}"><br>
            
            <label for="email-input">Email: </label>
            <input id="email-input" type="email" name="email" required pattern="${emailPattern}"><br>
            
            <label for="first-name-input">First name: </label>
            <input id="first-name-input" type="text" name="firstName" required><br>
            
            <label for="last-name-input">Last name: </label>
            <input id="last-name-input" type="text" name="lastName" required><br>
            
            <label for="address-input">Address: </label>
            <input id="address-input" type="text" name="address" required><br>
            
            <input class="submit-btn" type="submit" value="Order">
        </form>
    `)

    addEventListener('submit', (ev) => {
        ev.preventDefault()

        const phone = ev.target[0].value
        const email = ev.target[1].value
        const firstName = ev.target[2].value
        const lastName = ev.target[3].value
        const address = ev.target[4].value

        const credentials = new UserShipCredentials(phone, email, firstName, lastName, address)
        onSubmit(credentials)
    })

    return categoriesDom
}

export default view
