import { useUserStore } from '@/stores/userStore'
import {
  type UserResponseData,
  type CreateUserData,
API_GET_ALL_USERS,
API_CREATE_USER
} from '@/types/UserTypes'
import axios, { type AxiosInstance, type AxiosResponse } from 'axios'

// INSTANCE CREATION
const userInstance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 3000
})
//

// GET AND DELETE REQUEST INTERCEPTOR
// :: INJECT BEARER TOKEN ::
userInstance.interceptors.request.use((config) => {
  const userStore = useUserStore()

  const configEqualsGet = config.method === 'get' || config.method === 'GET'

  if (
    (configEqualsGet) &&
    !!userStore.bearerToken
  ) {
    config.headers = {
      Authorization: 'Bearer ' + userStore.bearerToken
    }
  }

  return config
})
//

// USERS INSTANCE METHODS
const fetchUsers = (): Promise<AxiosResponse<UserResponseData[], any>> => {
  return userInstance.get(API_GET_ALL_USERS)
}

const createUser = (data: CreateUserData): Promise<AxiosResponse> => {
  return userInstance.post(API_CREATE_USER, data)
}

export { fetchUsers, createUser }
