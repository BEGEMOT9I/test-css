// @flow
import React, { Component, type Node } from 'react'
import injectSheet from 'react-jss'

import styles from './styles'

type Props = {
  classes: Object,
  children: Node
}

class Layout extends Component<Props> {
  render() {
    const { classes } = this.props
    return <main className={classes.layout}>{this.props.children}</main>
  }
}

export default injectSheet(styles)(Layout)
