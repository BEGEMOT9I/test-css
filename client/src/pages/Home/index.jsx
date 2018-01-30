// @flow
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import injectSheet from 'react-jss'

import styles from './styles'

type Props = {
  classes: Object
}
type State = {}

class Home extends Component<Props, State> {

  render() {
    const { classes } = this.props

    return (
      <section className={classes.container}>
        <h1>Hi</h1>
        <Link to="/test-classes-overload">Test classes overload</Link>
      </section>
    )
  }
}

export default injectSheet(styles)(Home)
