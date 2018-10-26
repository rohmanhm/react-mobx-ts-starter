import AuthStore from './auth'
import AppStore from './app'

export interface RootStore {
  AuthStore?: typeof AuthStore
  AppStore?: typeof AppStore
}

export type RootStoreKeys = keyof RootStore

export default {
  AuthStore,
  AppStore
}
