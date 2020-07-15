export const MAKE_TURN = 'MAKE_TURN';
export const RESET = 'RESET';

export type ActionType =
  | { type: typeof MAKE_TURN; count: number }
  | { type: typeof RESET; initialState: IGameState };

export interface IConfiguration {
  name: string;
  firstMoveByAi: boolean;
}

export interface IGameState {
  numberOfMatches: number[];
  playerIndex: number;
}

export interface IGameReducer {
  reset: () => void;
  makeTurn: (takenMatches: number) => void;
}

export interface IPlayer {
  leftMatches: number;
  takenMatches: number;
  isTurn: boolean;
  makeTurn: (count: number) => void;
}