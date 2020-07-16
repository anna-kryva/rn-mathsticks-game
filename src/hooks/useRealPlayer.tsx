import React from 'react';
import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { MatchButton } from '../components/MatchButton';
import { PlayerConfiguration } from '../types';

const useRealPlayer = (player: PlayerConfiguration) => {
  const { leftMatches, isTurn, makeMove } = player;
  const [isDisabled, setIsDisabled] = useState(isTurn);
  
  useEffect(() => {
    setIsDisabled(!isTurn);
  }, [isTurn]);

  const buttons = [1, 2, 3].map((value) => {
    if (value <= leftMatches) {
      return (
        <MatchButton
          key={value}
          numberOfMatches={value}
          onSubmit={makeMove}
          disabled={isDisabled}
        />
      );
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.buttonsBlock}>{buttons}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
  },
  buttonsBlock: {
    marginVertical: 20,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-around',
  },
});

export default useRealPlayer;
