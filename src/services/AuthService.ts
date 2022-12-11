import axios, { Axios, type AxiosInstance, type AxiosResponse } from 'axios'
import { API_AUTH, type UserAuthFields } from '../types/AuthTypes'
import { useUserStore } from '../stores/userStore'
import jwt_decode from 'jwt-decode'

class AuthenticationService {
  private baseURL: string 
  private headers: { [key: string]: string}
  private instance: AxiosInstance

  constructor(baseURL: string) {
    this.baseURL = baseURL
    this.headers =  { 'Content-Type': 'application/json' }
    this.instance = axios.create({
      baseURL: this.baseURL,
      headers: this.headers 
    }) 

    this.instance.interceptors.response.use(
      (res) => {
        const { data } = res
        const store = useUserStore()
        
        store.bearerToken = data.id
        store.isLoggedIn = true
        store.user = data
    
        return Promise.resolve(res)
      },
      function (error) {
        return Promise.reject(error)
      }
    )
  }

  getAuth(
    data: UserAuthFields
  ): Promise<AxiosResponse<string, any>> {
    return this.instance.post(API_AUTH, data as UserAuthFields)
  }  
}

console.log(import.meta.env)
export const auth = new AuthenticationService(import.meta.env.PROD ? process.env.VITE_API_BASE_URL as string : 'http://localhost:3000/')