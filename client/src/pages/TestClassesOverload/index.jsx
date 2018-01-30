// @flow
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { Wrapper, result, ELEMENTS_COUNT } from './sc'

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
      <Wrapper>
        {this.elements.map(index => {
          const Component = result[`Tco${index}`]
          return <Component key={`tco-${index}`} />
        })}
        <Link to="test-styles-overload">Test styles overload</Link>
      </Wrapper>
    )
  }
}

export default TestClassesOverload
