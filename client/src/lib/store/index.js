// @flow
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'

import rootReducer from '../redux/reducers'
import saga from '../sagas'
import middlewares, { sagaMiddleware } from './middleware'

export default function configureStore(initialState: GlobalState) {
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
  )

  sagaMiddleware.run(saga)
  return store
}
