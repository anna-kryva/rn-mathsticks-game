import * as R from 'ramda';
import { Reducer } from 'react';
import { IGameState } from '../types';
import { MAKE_TURN, RESET, ActionType } from '../types';

export const gameReducer: Reducer<IGameState, ActionType> = (state, action) => {
  switch (action.type) {
    case MAKE_TURN:
      const numberOfMatches = R.adjust(
        state.playerIndex,
        R.add(action.count),
        state.numberOfMatches
      );
      const playerIndex =
        (state.playerIndex + 1) % state.numberOfMatches.length;
      return { numberOfMatches, playerIndex };
    case RESET:
      return action.initialState;
    default:
      return state;
  }
};
