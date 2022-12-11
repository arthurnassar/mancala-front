export interface UserLogin {
  email: string
  password: string
}

export interface UserResponseData {
  id: number | null
  email: string
}

export interface CreateUserData {
  email: string
  password: string
}

export const BEARER_TOKEN = 'bearer_token'
export const IS_LOGGED_IN = 'is_logged_in'
export const API_CREATE_USER = 'user'
export const API_GET_ALL_USERS = 'userS'

export enum GetMethod {
  get = "get",
  GET = "GET",
  Get = "Get"
}