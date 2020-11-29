class TemplateProcessor {
    /**
     * @param {Node} view
     */
    render(view) {
        const rootNode = document.getElementById('main')
        rootNode.innerHTML = ''
        rootNode.appendChild(view)
    }
}

export default TemplateProcessor
