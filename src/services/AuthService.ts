import axios, { type AxiosInstance, type AxiosResponse } from 'axios'
import { API_AUTH, type UserAuthFields } from '../types/AuthTypes'
import { useUserStore } from '../stores/userStore'
import jwt_decode from 'jwt-decode'

const login: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: { 'Content-Type': 'application/json' }
})

login.interceptors.response.use(
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

const getAuth = (
  data: UserAuthFields
): Promise<AxiosResponse<string, any>> => {
  return login.post(API_AUTH, data as UserAuthFields)
}

export { getAuth }
