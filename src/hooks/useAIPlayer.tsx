import React, { useEffect, useState } from 'react';
import delay from 'delay';

import { View, Text, StyleSheet } from 'react-native';

import getSelectedNumber from '../algorithms/getSelectedNumber';
import renderStatusEvent from '../utils/renderStatusEvent';

import { PlayerConfiguration } from '../types';
import { COLORS } from '../theme';

const useAIPlayer = (player: PlayerConfiguration): JSX.Element => {
  const { isTurn, makeMove, onEvent } = player;
  const [isDelayed, setIsDelayed] = useState<boolean>(false);

  useEffect(() => {
    const delayedMove = delay(1000);

    if (isTurn) {
      (async () => {
        const count = getSelectedNumber(player);
        
        setIsDelayed(true);
        await delayedMove;
        makeMove(count);

        const statusEvent = renderStatusEvent(count);
        onEvent(statusEvent);
      })();
    } else {
      setIsDelayed(false);
    }
    return () => {
      delayedMove.clear();
    };
  }, [isTurn]);

  return (
    <View style={styles.container}>
      <Text style={styles.status}>
        {isDelayed ? `AI is making a choice...` : ''}
      </Text>
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
