import { useUserStore } from '@/stores/userStore'
import { API_CREATE_GAME, API_MOVE_PIECE, type CreateGame, type Game, type MovePieceData } from '@/types/GameTypes'
import axios, { type AxiosInstance, type AxiosResponse } from 'axios'

class GameService {
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

    this.instance.interceptors.request.use(
      (config) => {
        config.headers = config.headers ?? {};
        const store = useUserStore()
        const bearer_token = store.bearerToken as string
        config.headers.Authorization = `Bearer ${bearer_token}`
        return config
      },
      (error) => {
        return Promise.reject(error);
      }
    )
  }

  createGame(data: CreateGame): Promise<AxiosResponse<Game, any>> {
    return this.instance.post(API_CREATE_GAME, data)
  }
  
  movePiece(data: MovePieceData): Promise<AxiosResponse<Game[], any>> {
    return this.instance.post(API_MOVE_PIECE, data)
  }
}

const apiBaseUrl = import.meta.env.PROD ? import.meta.env.VITE_API_BASE_URL : 'http://localhost:3000/'
export const gameService = new GameService(apiBaseUrl)