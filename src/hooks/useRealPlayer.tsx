import React from 'react';
import delay from 'delay';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MatchButton } from '../components/MatchButton';
import { PlayerConfiguration } from '../types';
import { COLORS } from '../theme';

const useRealPlayer = (player: PlayerConfiguration) => {
  const { leftMatches, isTurn, makeMove } = player;
  const [isDisabled, setIsDisabled] = useState(isTurn);
  const [isDelayed, setIsDelayed] = useState(false);
  let selectedNumber = 0;

  useEffect(() => {
    setIsDelayed(false);
    setIsDisabled(!isTurn);
  }, [isTurn]);

  const makeMoveHolder = async (numberOfMatches: number) => {
    selectedNumber = numberOfMatches;
    setIsDisabled(true);
    setIsDelayed(true);
    await delay(1000);
    makeMove(numberOfMatches);
  };

  const buttons = [1, 2, 3].map((value) => {
    if (value <= leftMatches) {
      return (
        <MatchButton
          key={value}
          numberOfMatches={value}
          onSubmit={makeMoveHolder}
          disabled={isDisabled}
        />
      );
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.buttonsBlock}>{buttons}</View>
      {/* <Text style={styles.status}>
        {isDelayed ? `Player took ${selectedNumber} matches` : ''}
      </Text> */}
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
  status: {
    fontSize: 20,
    color: COLORS.WHITE,
  },
});

export default useRealPlayer;
