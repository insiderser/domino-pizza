import TemplateProcessor from './templateProcessor.js'
import Client from './client.js'
import Router from './router.js'

const router = new Router()
const templateProcessor = new TemplateProcessor()

const client = new Client({
    onResourceNotFound: () => router.navigateTo(''),
    onUnknownError: message => alert(message),
})

const stateObservable = router.getStateObservable()
stateObservable.subscribe(({viewName, endpointName}) => {
    let view
    import(`./views/${viewName}.js`)
        .then((viewModule) => {
            view = viewModule.default
            return client.getData(endpointName)
        })
        .then((data) => {
            templateProcessor.render(view(data))
        })
})
