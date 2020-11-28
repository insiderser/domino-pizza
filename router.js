const {BehaviorSubject} = rxjs

class Router {
    /**
     * @return {Observable}
     */
    getStateObservable() {
        const stateSubject = new BehaviorSubject(this.getCurrentState())

        addEventListener('hashchange', () => {
            const newState = this.getCurrentState()
            stateSubject.next(newState)
        })

        return stateSubject
    }

    getCurrentState() {
        const hash = window.location.hash.split('#')[1] ?? ''

        let viewName
        let endpointName = hash

        if (hash.startsWith('categories/')) {
            viewName = 'categoryPage'
        } else if (hash.startsWith('products/')) {
            viewName = 'productDetails'
        } else if (hash.startsWith('sales/')) {
            viewName = 'saleDetails'
        } else if (hash.length === 0) {
            viewName = 'homePage'
            endpointName = 'db'
        } else {
            console.log(`Unknown route: ${hash}`)
            this.navigateTo('')
        }

        return {
            viewName,
            endpointName,
        }
    }

    navigateTo(hash) {
        window.location.hash = hash
    }
}

export default Router
