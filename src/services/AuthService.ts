import axios, { Axios, type AxiosInstance, type AxiosResponse } from 'axios'
import { API_AUTH, type UserAuthFields } from '../types/AuthTypes'
import { useUserStore } from '../stores/userStore'
import jwt_decode, { type JwtPayload } from 'jwt-decode'

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
        const store = useUserStore()
        const { data } = res
        const payload = jwt_decode<{
            email: string,
            sub: string,
        }>(data.access_token)
        
        store.bearerToken = data.access_token
        store.isLoggedIn = true
        store.user = {
          sub: payload.sub,
          email: payload.email
        }
    
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

const apiBaseUrl = import.meta.env.PROD ? import.meta.env.VITE_API_BASE_URL : 'http://localhost:3000/'
export const authService = new AuthenticationService(apiBaseUrl)