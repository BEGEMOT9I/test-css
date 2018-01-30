// @flow
import React, { Component, type Node } from 'react'

import classes from './styles.scss'

type Props = {
  children: Node
}

class Layout extends Component<Props> {
  render() {
    return <main className={classes.layout}>{this.props.children}</main>
  }
}

export default Layout
