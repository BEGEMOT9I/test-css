import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
import { routerMiddleware as createRouterMiddleware } from 'react-router-redux'

import history from './history'

const middlewares = []

const routerMiddleware = createRouterMiddleware(history)
middlewares.push(routerMiddleware)

const sagaMiddleware = createSagaMiddleware()
middlewares.push(sagaMiddleware)

if (process.env.NODE_ENV === 'developement') {
  const logger = createLogger({
    collapsed: true
  })
  middlewares.push(logger)
}

export { middlewares as default, sagaMiddleware }
