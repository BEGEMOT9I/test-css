// @flow

export const COUNT_ELEMENTS = 1000

const styles = {
  container: {
    display: 'flex',
    'flex-wrap': 'wrap',
    width: '100%',
    height: '100%'
  }
}

for (let i = 0; i < COUNT_ELEMENTS; i += 1) {
  styles[`tco-${i}`] = {
    width: '20px',
    height: '20px',
    'background-color': `rgb(0, ${Math.round(i / 255) % 255}, ${i % 255})`
  }
}

export default styles
