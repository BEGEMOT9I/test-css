// @flow
import React, { Component } from 'react'

import { container, result, ELEMENTS_COUNT } from './classes'

type Props = {}
type State = {}

class TestClassesOverload extends Component<Props, State> {
  elements: Array<number>

  constructor(props: Props) {
    super(props)

    this.elements = []

    for (let i = 0; i < ELEMENTS_COUNT; i += 1) {
      this.elements.push(i)
    }
  }

  render() {
    return (
      <section className={container}>
        {this.elements.map(index => (
          <div key={`tco-${index}`} className={result[`Tco${index}`]} />
        ))}
      </section>
    )
  }
}

export default TestClassesOverload
