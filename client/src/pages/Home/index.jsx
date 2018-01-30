// @flow
import React, { Component } from 'react'

import classes from './styles.scss'

type Props = {}
type State = {}

class Home extends Component<Props, State> {

  render() {
    return (
      <section className={classes.container}>
        <h1>Hi</h1>
      </section>
    )
  }
}

export default Home
