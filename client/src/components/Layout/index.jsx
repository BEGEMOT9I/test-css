// @flow
import React, { Component, type Node } from 'react'

import { Wrapper } from './sc'

type Props = {
  children: Node
}

class Layout extends Component<Props> {
  render() {
    return <Wrapper>{this.props.children}</Wrapper>
  }
}

export default Layout
