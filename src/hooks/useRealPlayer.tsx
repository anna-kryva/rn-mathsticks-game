import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MatchButton } from '../components/MatchButton';
import { PlayerConfiguration } from '../types';
import renderStatusEvent from '../utils/renderStatusEvent';
import { COLORS } from '../theme';

const useRealPlayer = (player: PlayerConfiguration): JSX.Element => {
  const { leftMatches, isTurn, makeMove, onEvent } = player;
  const [isDisabled, setIsDisabled] = useState<boolean>(isTurn);

  useEffect(() => {
    setIsDisabled(!isTurn);
  }, [isTurn]);

  const selectNumberHandler = (count: number): void => {
    makeMove(count);

    const statusEvent = renderStatusEvent(count, false);
    onEvent(statusEvent);
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

  return (
    <View style={styles.container}>
      <Text style={styles.question}>
        {isDisabled ? '' : 'How many matches do you take?'}
      </Text>
      <View style={styles.buttonsBlock}>{buttons}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
  },
  question: {
    textAlign: 'center',
    fontSize: 20,
    color: COLORS.WHITE,
  },
  buttonsBlock: {
    marginVertical: 20,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
});

export default useRealPlayer;
