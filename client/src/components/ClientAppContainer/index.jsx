// @flow
import React from 'react'
import { ConnectedRouter } from 'react-router-redux'
import { create as createJss } from 'jss'
import { JssProvider } from 'react-jss'
import vendorPrefixer from 'jss-vendor-prefixer'

const jss = createJss()
jss.use(vendorPrefixer())

import Layout from '../Layout'
import AppRouter from '../AppRouter'
import history from '../../lib/store/history'

const ClientAppContainer = () => (
  <JssProvider jss={jss}>
    <Layout>
      <ConnectedRouter history={history}>
        <AppRouter />
      </ConnectedRouter>
    </Layout>
  </JssProvider>
)

export default ClientAppContainer
