import React, { useState, useEffect } from 'react';
import * as R from 'ramda';

import { View, Button, StyleSheet } from 'react-native';
import { PlayerScore } from '../components/PlayerScore';
import { TurnBlock } from '../components/TurnBlock';
import { MatchesLeft } from '../components/MatchesLeft';
import { StatusBlock } from '../components/StatusBlock';

import {
  IConfiguration,
  PlayerConfiguration,
  IGameState,
  StatusEvent,
} from '../types';

import useGameReducer from '../hooks/useGameReducer';
import useAIPlayer from '../hooks/useAIPlayer';
import useRealPlayer from '../hooks/useRealPlayer';

import { COLORS } from '../theme';
import { MATCHSTICKS_COUNT, AI_NAME } from '../constants';

function createPlayerConfiguration(
  playerIndex: number,
  gameState: IGameState,
  makeTurn: (count: number) => void,
  firstMoveByAi: boolean,
  onEvent: (statusEvent: StatusEvent) => void
): PlayerConfiguration {
  return {
    totalMatches: MATCHSTICKS_COUNT,
    leftMatches: R.subtract(
      MATCHSTICKS_COUNT,
      R.sum(gameState.numberOfMatches)
    ),
    takenMatches: gameState.numberOfMatches[playerIndex],
    isTurn: gameState.playerIndex === playerIndex,
    makeMove: makeTurn,
    firstMover: Boolean(playerIndex) !== firstMoveByAi,
    onEvent,
  };
}

interface Props {
  configuration: IConfiguration;
  restartGame: () => void;
  endGame: (score: number) => void;
}

export const GameScreen: React.FC<Props> = ({
  configuration,
  restartGame,
  endGame,
}) => {
  const [gameState, { reset, makeTurn }] = useGameReducer({
    numberOfMatches: [0, 0],
    playerIndex: configuration.firstMoveByAI ? 0 : 1,
  });
  const [statusEvent, setStatusEvent] = useState<StatusEvent | undefined>(
    undefined
  );

  const names = [AI_NAME, configuration.name];

  const [aiPlayerConfiguration, realPlayerConfiguration] = [0, 1].map((index) =>
    createPlayerConfiguration(
      index,
      gameState,
      makeTurn,
      configuration.firstMoveByAI,
      (event: StatusEvent) => setStatusEvent(event)
    )
  );

  const realPlayerComponent = useRealPlayer(realPlayerConfiguration);
  const aiPlayerComponent = useAIPlayer(aiPlayerConfiguration);

  const exitHolder = () => {
    restartGame();
    reset();
  };

  useEffect(() => {
    if (R.subtract(MATCHSTICKS_COUNT, R.sum(gameState.numberOfMatches)) === 0) {
      endGame(gameState.numberOfMatches[1]);
    }
  }, [gameState.numberOfMatches]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MatchesLeft
          count={R.subtract(
            MATCHSTICKS_COUNT,
            R.sum(gameState.numberOfMatches)
          )}
        />

        <View style={styles.exit}>
          <Button title="Exit" onPress={exitHolder} color={COLORS.GOLD} />
        </View>
      </View>

      <View style={styles.centerBlock}>
        <TurnBlock name={names[gameState.playerIndex]} />

        <View style={styles.choiceBlock}>
          {realPlayerComponent}
          {aiPlayerComponent}
        </View>

        <StatusBlock statusEvent={statusEvent} />
      </View>

      <View>
        {gameState.numberOfMatches.map((_, index) => (
          <PlayerScore
            key={index.toString()}
            name={names[index]}
            count={gameState.numberOfMatches[index]}
            isPerson={index > 0 ? true : false}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLORS.BLACK,
    padding: 20,
    justifyContent: 'space-between',
  },
  header: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exit: {
    width: 150,
  },
  centerBlock: {
    flex: 1,
  },
  choiceBlock: {
    flex: 0.8,
  },
});
