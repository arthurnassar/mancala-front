

export const API_CREATE_GAME = 'game'
export const API_MOVE_PIECE = 'move'

export interface CreateGame {
    pits: number
    pieces: number
    userId: number
}

export interface Pit {
  pitNumber: number;
  pieces: Piece[];
}

export interface Game {
  id: number;
  turn: 1 | 2;
  gameEnded?: 1 | 2 | 3;
  pitCount: number;
  pits: Pit[];
  p1Pit: Piece[];
  p2Pit: Piece[];
  pieces: Piece[];
  player: number;
}

export interface Piece {
  pieceNumber: number;
}

export interface MovePieceData {
  gameId: number
  player: number
  pit: number
  
}