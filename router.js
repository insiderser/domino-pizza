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
        let viewName = ''
        let endpointName = ''
        switch (window.location.hash.split('#')[1]) {
            case 'products':
                viewName = 'productsPage'
                endpointName = 'products'
                break
            default:
                break
        }

        return {
            viewName,
            endpointName,
        }
    }
}

export default Router
