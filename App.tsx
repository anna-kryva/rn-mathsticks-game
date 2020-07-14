import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ConfigurationScreen } from './src/screens/ConfigurationScreen';
import { GameScreen } from './src/screens/GameScreen';
import { IConfiguration } from './src/types';

export default function App() {
  const [configuration, setConfiguration] = useState<
    IConfiguration | undefined
  >(undefined);

  return (
    <View style={styles.container}>
      {configuration ? (
        <GameScreen configuration={configuration} goBack={() => setConfiguration(undefined)}/>
      ) : (
        <ConfigurationScreen
          onSubmit={(value: IConfiguration) => setConfiguration(value)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
