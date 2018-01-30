// @flow
import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'

import routes from '../../routes'

type Props = {
  location: Object
}
type State = {}

class AppRouter extends Component<Props, State> {
  render() {
    const { location } = this.props

    return (
      <Switch location={location}>
        {routes.map(route => {
          const { path, component: Page, ...routeProperties } = route

          return (
            <Route
              key={path}
              path={path}
              {...routeProperties}
              render={props => <Page {...props} location={location} />}
            />
          )
        })}
      </Switch>
    )
  }
}

export default withRouter(AppRouter)
