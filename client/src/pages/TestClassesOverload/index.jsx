// @flow
import React, { Component } from 'react'

import { Wrapper, Tco1, Tco2 } from './sc'

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
      <Wrapper>
        {this.elements.map(
          index =>
            index % 2 ? (
              <Tco1 key={`tco-${index}`} />
            ) : (
              <Tco2 key={`tco-${index}`} />
            )
        )}
      </Wrapper>
    )
  }
}

export default TestClassesOverload
