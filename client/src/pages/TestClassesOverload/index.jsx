// @flow
import React, { Component } from 'react'
import injectSheet from 'react-jss'

import styles, { COUNT_ELEMENTS } from './styles'

type Props = {
  classes: Object
}
type State = {}

class TestClassesOverload extends Component<Props, State> {
  elements: Array<number>

  constructor(props: Props) {
    super(props)

    this.elements = []

    for (let i = 0; i < COUNT_ELEMENTS; i += 1) {
      this.elements.push(i)
    }
  }
  render() {
    const { classes } = this.props

    return (
      <section className={classes.container}>
        {this.elements.map(index => (
          <div key={`tco-${index}`} className={classes[`tco-${index}`]} />
        ))}
      </section>
    )
  }
}

export default injectSheet(styles)(TestClassesOverload)
