import { useReducer } from 'react';
import { gameReducer } from '../reducer/gameReducer';

import { IGameState, IGameReducer } from '../types';
import { MAKE_TURN, RESET } from '../types';

const useGameReducer = (initialState: IGameState) : [IGameState, IGameReducer] => {
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

export default useGameReducer;
