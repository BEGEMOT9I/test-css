// @flow
import styled from 'styled-components'

export const ELEMENTS_COUNT = 10000

const Wrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
`

const Tco1 = styled.div`
  width: 20px;
  height: 20px;
  background-color: red;
`

const Tco2 = styled.div`
  width: 20px;
  height: 20px;
  background-color: red;
`

export { Wrapper, Tco1, Tco2 }
