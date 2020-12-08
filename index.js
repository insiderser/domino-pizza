import CartRepository from "./data/CartRepository.js"
import NavDestination from "./navigation/NavDestination.js"
import Router from './navigation/router.js'
import TemplateProcessor from './templateProcessor.js'

const {from} = rxjs
const {switchMap} = rxjs.operators

const router = new Router()
const templateProcessor = new TemplateProcessor()
const cartRepository = new CartRepository()

router.getStateObservable()
    .pipe(switchMap(destination => from(
        import(`./controllers/${(destination.controllerName)}.js`)
            .then(module => module.default)
            .then(Controller => new Controller(router, destination.args))
    )))
    .pipe(switchMap(controller => controller.getViewObservable()))
    .subscribe(dom => templateProcessor.render(dom));

(function () {
    const logo = document.getElementById('logo')
    logo.onclick = () => router.navigateTo(NavDestination.home())
})();

(function () {
    const orderBtn = document.getElementById('header-order-btn')
    let selectedProductsCount = 0

    cartRepository.getProductsCount()
        .subscribe(count => {
            if (count > 0) {
                orderBtn.innerText = `Order ${count} pizzas`
            }
            orderBtn.hidden = (count === 0)
            selectedProductsCount = count
        })

    orderBtn.onclick = (ev) => {
        if (selectedProductsCount > 0) {
            router.navigateTo(NavDestination.cart())
            ev.stopPropagation()
        }
    }
})()
