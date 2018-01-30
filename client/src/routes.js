// @flow
import Home from './pages/Home'
import TestClassesOverload from './pages/TestClassesOverload'
import TestStylesOverload from './pages/TestStylesOverload'

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
  },
  {
    path: '/test-styles-overload',
    exact: true,
    component: TestStylesOverload
  }
]
