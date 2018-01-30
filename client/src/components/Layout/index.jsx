// @flow
import React, { Component, type Node } from 'react'

import * as classes from './classes'

type Props = {
  children: Node
}

class Layout extends Component<Props> {
  render() {
    return <main className={classes.container}>{this.props.children}</main>
  }
}

export default Layout
