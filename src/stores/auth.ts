import { observable, action, reaction, computed } from 'mobx'
// Stores
import { GlobalStore } from './global'
// Actions
import * as AuthActions from '~/actions/auth'
// Helpers
import {
  saveAuthentication,
  readAuthentication,
  removeAuthentication
} from '~/services/Auth'
// Types
import { UserModel } from '~/types/user'
import { Optional } from '~/types'

export class AuthStore extends GlobalStore {
  @observable
  public user: Optional<UserModel> = {}

  @observable
  public token = readAuthentication()

  constructor () {
    super()

    reaction(
      () => this.token,
      token => {
        if (token) {
          saveAuthentication(token)
        } else {
          removeAuthentication()
        }
      }
    )
  }

  // region user
  @action
  public async login (email: string, password: string) {
    try {
      const result = await AuthActions.login(email, password)
      if (result.status) {
        saveAuthentication(result.data.Authorization)
        return result
      }

      throw result
    } catch (err) {
      throw err
    }
  }

  @action
  public setUser (user: UserModel) {
    this.user = user
  }

  @computed
  public get profile () {
    return new Promise((resolve, reject) => {
      if (!this.token) reject(new Error('Not Authenticated'))

      AuthActions.getProfile(this.token)
        .then(resolve)
        .catch(reject)
    })
  }

  @computed
  public get prefix () {
    return (this.user && this.user.prefix) || ''
  }

  // endregion user
}

export default new AuthStore()
