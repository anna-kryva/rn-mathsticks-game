import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { ConfigurationScreen } from './src/screens/ConfigurationScreen';
import { GameScreen } from './src/screens/GameScreen';
import { GameOverScreen } from './src/screens/GameOverScreen';

import { IConfiguration } from './src/types';

export default function App() {
  const [configuration, setConfiguration] = useState<
    IConfiguration | undefined
  >(undefined);

  const startGame = (configuration: IConfiguration): void => {
    setConfiguration(configuration);
    setCurrentScreen(
      <GameScreen
        configuration={configuration}
        restartGame={restartGame}
        endGame={endGame}
      />
    );
  };

  const endGame = (score: number) => {
    setCurrentScreen(
      <GameOverScreen score={score} restartGame={restartGame} />
    );
  };

  const restartGame = () => {
    setCurrentScreen(
      <ConfigurationScreen
        configuration={configuration}
        startGame={startGame}
      />
    );
  };

  const [currentScreen, setCurrentScreen] = useState(
    <ConfigurationScreen configuration={configuration} startGame={startGame} />
  );

  return <View style={styles.container}>{currentScreen}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
