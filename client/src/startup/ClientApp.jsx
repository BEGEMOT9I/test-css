// @flow
import './registerSW'

import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import ReactOnRails from 'react-on-rails'
import { Provider } from 'react-redux'

import reducer from '../lib/redux/reducers'
import ClientAppContainer from '../components/ClientAppContainer'

type Props = {}
type RailsContext = {}

const renderApp = (ClientAppComponent, store, DOMElement) => {
  const component = (
    <AppContainer>
      <Provider store={store}>
        <ClientAppComponent />
      </Provider>
    </AppContainer>
  )

  render(component, DOMElement)
}

const ClientApp = (
  props: Props,
  railsContext: RailsContext,
  DOMNodeID: string
) => {
  const store = ReactOnRails.getStore('store')
  const rootElement = document.getElementById(DOMNodeID)

  if (rootElement) {
    renderApp(ClientAppContainer, store, rootElement)

    if (module.hot) {
      // Enable Webpack hot module replacement for reducers
      module.hot.accept(
        ['../lib/redux/reducers', '../components/ClientAppContainer'],
        () => {
          store.replaceReducer(reducer)
          renderApp(ClientAppContainer, store, rootElement)
        }
      )
    }
  }
}

export default ClientApp
