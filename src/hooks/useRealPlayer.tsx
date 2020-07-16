import React from 'react';
import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { MatchButton } from '../components/MatchButton';
import { PlayerConfiguration } from '../types';

const useRealPlayer = (player: PlayerConfiguration) => {
  const { leftMatches, isTurn, makeMove } = player;
  const [isDisabled, setIsDisabled] = useState<boolean>(isTurn);
  const [selectedNumber, setSelectedNumber] = useState<number>(0);

  useEffect(() => {
    setIsDisabled(!isTurn);
  }, [isTurn]);

  const selectNumberHandler = (count: number): void => {
    makeMove(count);
    setSelectedNumber(count);
  };

  const buttons = [1, 2, 3].map((value) => {
    if (value <= leftMatches) {
      return (
        <MatchButton
          key={value}
          numberOfMatches={value}
          onSubmit={selectNumberHandler}
          disabled={isDisabled}
        />
      );
    }
  });

  return [
    <View style={styles.container}>
      <View style={styles.buttonsBlock}>{buttons}</View>
    </View>,
    `You have chosen ${selectedNumber} matchstick${
      selectedNumber != 1 ? 's' : ''
    }.`,
  ];
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
