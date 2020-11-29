import TemplateProcessor from './templateProcessor.js'
import Router from './navigation/router.js'

const {from} = rxjs
const {map, flatMap} = rxjs.operators

const router = new Router()
const templateProcessor = new TemplateProcessor()

router.getStateObservable()
    .pipe(map(destination => destination.controllerName))
    .pipe(flatMap(controllerName => from(import(`./controllers/${controllerName}.js`))))
    .pipe(map(module => module.default))
    .pipe(map(Controller => new Controller(router)))
    .pipe(flatMap(controller => controller.getViewObservable()))
    .subscribe(dom => templateProcessor.render(dom))
