// @flow
import cxs from 'cxs'

const ELEMENTS_COUNT = 10000

const container = cxs({
  display: 'flex',
  flexWrap: 'wrap',
  width: '100%',
  height: '100%'
})

let result = {}

for (let i = 0; i < ELEMENTS_COUNT; i += 1) {
  result[`Tco${i}`] = cxs({
    width: '20px',
    height: '20px',
    backgroundColor: 'red'
  })
}

export { container, result, ELEMENTS_COUNT }
