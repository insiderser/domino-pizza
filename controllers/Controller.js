const {BehaviorSubject} = rxjs
const {map} = rxjs.operators

class Controller {
    /**
     * @param {Router} router
     * @param {null|any} args
     * @param {any} initialState
     */
    constructor(router, args, initialState) {
        if (this.constructor === Controller) {
            throw new Error("Abstract classes can't be instantiated.")
        }

        this.router = router
        this.state = new BehaviorSubject(initialState)
    }

    /**
     * @return {Element}
     */
    renderState(state) {
        throw new Error('Abstract method not implemented.')
    }

    /**
     * @param {function(state): state} newStateProducer
     */
    updateState(newStateProducer) {
        const newState = newStateProducer(this.state.value)
        this.state.next(newState)
    }

    /**
     * @return {Observable<Node>}
     */
    getViewObservable() {
        return this.state.asObservable()
            .pipe(map(state => this.renderState(state)))
    }
}

export default Controller
