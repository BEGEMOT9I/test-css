// @flow
import React from 'react'
import { ConnectedRouter } from 'react-router-redux'

import Layout from '../Layout'
import AppRouter from '../AppRouter'
import history from '../../lib/store/history'

const ClientAppContainer = () => (
  <Layout>
    <ConnectedRouter history={history}>
      <AppRouter />
    </ConnectedRouter>
  </Layout>
)

export default ClientAppContainer
