// @flow
import Home from './pages/Home'
import TestClassesOverload from './pages/TestClassesOverload'

export default [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/test-classes-overload',
    exact: true,
    component: TestClassesOverload
  }
]
