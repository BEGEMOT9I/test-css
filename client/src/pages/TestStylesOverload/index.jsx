// @flow
import React, { Component } from 'react'

import { Wrapper, result, ELEMENTS_COUNT } from './sc'

type Props = {}
type State = {}

class TestStylesOverload extends Component<Props, State> {
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
      <Wrapper>
        {this.elements.map(index => {
          const Component = result[`Tco${index}`]
          return <Component key={`tco-${index}`} />
        })}
      </Wrapper>
    )
  }
}

export default TestStylesOverload
