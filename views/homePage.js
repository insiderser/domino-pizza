import productsListSection from "./productsListSection.js"

/**
 * @param {HomeData} data
 * @return {string}
 */
const view = (data) => `
<div id="home">
    ${productsListSection(data.products)}
</div>
`

export default view
