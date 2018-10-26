import Axios from 'axios'
import { Errors } from '~/types'

export interface Response<TData> {
  status: boolean
  message: string
  errors?: Errors<TData>
  data: TData
}

export const API = Axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL
})
