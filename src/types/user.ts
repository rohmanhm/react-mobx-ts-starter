import { Document, PaginateResult } from 'mongoose'

export interface User {
  cityId: null
  identityNumber: null
  recruitBy: null
  photoProfile: null
  photoIdentity: null
  memberTypeId: null
  isActive: boolean
  isBlocked: boolean
  walletId: null
  cardId: null
  pin: null
  isVerified: boolean
  username: string
  email: string
  name: string
  gender: string
  phone: string
  address: string
  levelConstantId: LevelConstantID
  joinDate: string
  prefix: string
}

export interface LevelConstantID {
  _id: number
  stringValue: string
}

export interface UserModel extends User, Document {}

export interface UserModelPaginate extends PaginateResult<UserModel> {}
