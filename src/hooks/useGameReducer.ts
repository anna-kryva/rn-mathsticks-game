import { useReducer, useCallback } from 'react';
import { gameReducer } from '../reducer/gameReducer';

import { IGameState } from '../types';
import { MAKE_TURN, RESET } from '../types';

const useGameState = (initialState: IGameState) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return [
    state,
    {
      reset: () => dispatch({ type: RESET, initialState }),
      makeTurn: (takenMatches: number) =>
        dispatch({ type: MAKE_TURN, count: takenMatches }),
    },
  ];
};

export default useGameState;
