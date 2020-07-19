import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { COLORS } from '../theme';
import {
  GAME_OVER_SUCCESS_MESSAGE,
  GAME_OVER_FAILURE_MESSAGE,
} from '../constants';

interface Props {
  score: number;
  restartGame: () => void;
}


const endGameMessage = (score: number) => {
  return score % 2 == 0 ? GAME_OVER_SUCCESS_MESSAGE : GAME_OVER_FAILURE_MESSAGE;
};

export const GameOverScreen: React.FC<Props> = ({ score, restartGame }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game Over!</Text>
      <Text style={styles.text}>{endGameMessage(score)}</Text>

      <View style={styles.buttonBlock}>
        <Button title="Start again" color={COLORS.GOLD} onPress={restartGame} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: COLORS.BLACK,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.GOLD,
    padding: 10,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    color: COLORS.WHITE,
    padding: 10,
  },
  buttonBlock: {
    margin: 20,
  },
});
