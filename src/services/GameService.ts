import { API_CREATE_GAME, API_MOVE_PIECE, type CreateGame, type Game, type MovePieceData } from '@/types/GameTypes'
import axios, { type AxiosResponse } from 'axios'

// ============= INSTANCE CREATION =======================
const gameService = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: { 'Content-Type': 'application/json' }
})

// ===== TODO: INTERCEPT



const createGame = (data: CreateGame): Promise<AxiosResponse<Game, any>> => {
  return gameService.post(API_CREATE_GAME, data)
}

const movePiece = (data: MovePieceData): Promise<AxiosResponse<Game[], any>> => {
  return gameService.post(API_MOVE_PIECE, data)
}

export { createGame, movePiece }
