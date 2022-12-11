import { useUserStore } from '@/stores/userStore'
import { type UserResponseData, type CreateUserData, API_GET_ALL_USERS, API_CREATE_USER, GetMethod } from '@/types/UserTypes'
import axios, { type AxiosInstance, type AxiosResponse } from 'axios'

class UserService {
  private baseURL: string
  private headers: { [key: string]: string}
  private instance: AxiosInstance

  constructor(baseURL: string) {
    this.baseURL = baseURL,
    this.headers = { 'Content-Type': 'application/json' },
    this.instance = axios.create({
      baseURL: this.baseURL,
      headers: this.headers
    })

    this.instance.interceptors.request.use((config) => {
      const userStore = useUserStore()
      
      const configEqualsGet = config.method === GetMethod.GET || config.method === GetMethod.Get || config.method === GetMethod.get
      const methodIsGetAndBearerTokenExists = (configEqualsGet) && !!userStore.bearerToken
      if (methodIsGetAndBearerTokenExists) {
        config.headers = {
          Authorization: 'Bearer ' + userStore.bearerToken
        }
      }
    
      return config
    })
  }

  fetchUsers(): Promise<AxiosResponse<UserResponseData[], any>> {
    return this.instance.get(API_GET_ALL_USERS)
  }
  
  createUser(data: CreateUserData): Promise<AxiosResponse> {
    return this.instance.post(API_CREATE_USER, data)
  }
}

const apiBaseUrl = import.meta.env.PROD ? import.meta.env.VITE_API_BASE_URL : 'http://localhost:3000/'
export const userService = new UserService(apiBaseUrl) 
