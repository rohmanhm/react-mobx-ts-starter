import { AxiosError } from 'axios'
// Services
import { API, Response } from '~/services/ExecAxios'
// Stores
import AuthStore from '~/stores/auth'
// Types
import { UserModel } from '~/types/user'

// region login stuff
interface LoginDataResponse {
  Authorization: string
}
export type LoginResponse = Response<LoginDataResponse>
export async function login (
  email: string,
  password: string
): Promise<LoginResponse> {
  try {
    const data = {
      email,
      password
    }

    AuthStore.startFetching()
    const result = await API.post<Response<LoginDataResponse>>(
      '/login-office',
      data
    )

    if (result.data && result.data.status) {
      return result.data
    }
  } catch (err) {
    const error = err as AxiosError
    if (error.response) {
      throw error.response.data
    }

    throw error
  } finally {
    AuthStore.stopFetching()
  }
}
// endregion

// region get profile
export interface ProfileDataResponse extends UserModel {}
export type ProfileResponse = Response<ProfileDataResponse>
export async function getProfile (
  userToken?: string
): Promise<ProfileResponse> {
  try {
    const token = userToken || AuthStore.token
    const config = { headers: { Authorization: token } }

    AuthStore.startFetching()
    const result = await API.get<Response<ProfileDataResponse>>(
      '/office/me',
      config
    )

    if (result.data && result.data.status) {
      AuthStore.setUser(result.data.data)

      return result.data
    }
  } catch (err) {
    const error = err as AxiosError
    if (error.response) {
      throw error.response.data
    }

    throw error
  } finally {
    AuthStore.stopFetching()
  }
}
// endregion
