// @flow
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import classes from './styles.scss'

type Props = {}
type State = {}

class TestClassesOverload extends Component<Props, State> {
  elements: Array<number>

  constructor(props: Props) {
    super(props)

    this.elements = []

    for (let i = 0; i < 1000; i += 1) {
      this.elements.push(i)
    }
  }
  render() {
    return (
      <section className={classes.container}>
        {this.elements.map(index => (
          <div key={`tco-${index}`} className={classes[`tco-${index}`]} />
        ))}
        <Link to="test-styles-overload">Test styles overload</Link>
      </section>
    )
  }
}

export default TestClassesOverload
