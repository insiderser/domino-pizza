import {parseElementFromString} from "../parser.js"

const view = () => parseElementFromString(`
    <img class="center-on-screen" alt="Loading..." src="images/loader.gif">
`)

export default view
