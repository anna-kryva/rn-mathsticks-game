import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { MatchButton } from '../components/MatchButton';
import { PlayerConfiguration } from '../types';
import renderStatusEvent from '../utils/renderStatusEvent';

const useRealPlayer = (player: PlayerConfiguration): JSX.Element => {
  const { leftMatches, isTurn, makeMove, onEvent } = player;
  const [isDisabled, setIsDisabled] = useState<boolean>(isTurn);

  useEffect(() => {
    setIsDisabled(!isTurn);
  }, [isTurn]);

  const selectNumberHandler = (count: number): void => {
    makeMove(count);

    const statusEvent = renderStatusEvent(count);
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
