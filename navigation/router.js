import NavDestination from "./NavDestination.js"

const {BehaviorSubject} = rxjs

class Router {
    /**
     * @return {Observable<NavDestination>}
     */
    getStateObservable() {
        const stateSubject = new BehaviorSubject(this.getCurrentState())

        addEventListener('hashchange', () => {
            const newState = this.getCurrentState()
            stateSubject.next(newState)
        })

        return stateSubject.asObservable()
    }

    /**
     * @return {NavDestination}
     */
    getCurrentState() {
        const hash = window.location.hash.split('#')[1] ?? ''
        const destination = NavDestination.findDestinationForHash(hash)

        if (destination === null) {
            console.log('No destination found for hash ' + hash)
            this.navigateTo(NavDestination.home())
            return this.getCurrentState()
        }

        return destination
    }

    /**
     * @param {NavDestination} destination
     */
    navigateTo(destination) {
        scrollTo(0, 0)
        window.location.hash = destination.hash
    }
}

export default Router
