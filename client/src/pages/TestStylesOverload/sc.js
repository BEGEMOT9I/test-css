// @flow
import styled from 'styled-components'

const ELEMENTS_COUNT = 10000

const Wrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
`

let result = {}

for (let i = 0; i < ELEMENTS_COUNT; i += 1) {
  result[`Tco${i}`] = styled.div`
    width: 20px;
    height: 20px;
    background-color: rgb(0, ${Math.round(i / 255) % 255}, ${i % 255});
  `
}

export { Wrapper, result, ELEMENTS_COUNT }
