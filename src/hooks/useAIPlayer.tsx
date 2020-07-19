import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import getNumber from '../algorithms/getNumber';
import renderStatusEvent from '../utils/renderStatusEvent';
import delay from '../utils/delay';

import { PlayerConfiguration } from '../types';
import { COLORS } from '../theme';

const useAIPlayer = (player: PlayerConfiguration): JSX.Element => {
  const { isTurn, makeMove, onEvent } = player;
  const [isDelayed, setIsDelayed] = useState<boolean>(false);

  useEffect(() => {
    const timeout = delay(2000);

    if (isTurn) {
      (async () => {
        const count = getNumber(player);

        setIsDelayed(true);
        await timeout;
        makeMove(count);

        const statusEvent = renderStatusEvent(count, true);
        onEvent(statusEvent);
      })();
    } else {
      setIsDelayed(false);
    }
    return () => {
      timeout.cancel();
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  status: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.GOLD,
    textAlign: 'center',
  },
});

export default useAIPlayer;
