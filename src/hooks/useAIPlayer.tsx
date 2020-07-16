import React from 'react';
import delay from 'delay';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PlayerConfiguration } from '../types';
import getSelectedNumber from '../algorithms/getSelectedNumber';
import { COLORS } from '../theme';

const useAIPlayer = (player: PlayerConfiguration) => {
  const { isTurn, makeMove } = player;
  const [isDelayed, setIsDelayed] = useState<boolean>(false);
  let selectedNumber = 0;

  useEffect(() => {
    const delayedMove = delay(1000);

    if (isTurn) {
      const takeMatches = async () => {
        setIsDelayed(true);
        selectedNumber = getSelectedNumber(player);
        await delayedMove;
        makeMove(selectedNumber);
      };
      takeMatches();
    } else {
      setIsDelayed(false);
    }
    return () => {
      delayedMove.clear();
    };
  }, [isTurn]);

  return (
    <View style={styles.container}>
      <Text style={styles.status}>{isDelayed ? `AI is thinking...` : ''}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
  },
  status: {
    fontSize: 20,
    color: COLORS.WHITE,
    textAlign: 'center',
  },
});

export default useAIPlayer;
