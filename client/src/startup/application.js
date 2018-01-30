// @flow
import ReactOnRails from 'react-on-rails'

import ClientApp from './ClientApp'
import configureStore from '../lib/store'

ReactOnRails.registerStore({ store: configureStore })

ReactOnRails.register({
  ClientApp
})
