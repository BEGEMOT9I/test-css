import type { Dispatch, GetState } from 'redux'

// eslint-disable-next-line no-unused-vars
declare module CSSModule {
  declare var exports: { [key: string]: string }
}

// eslint-disable-next-line no-unused-vars
declare var module: {
  hot: {
    accept(path: string | Array<string>, callback: () => void): void
  }
}

/* global ThunkAction */
declare type ThunkAction = (dispatch: Dispatch, getState: GetState) => any

/* global GlobalState */
declare type GlobalState = typeof undefined
