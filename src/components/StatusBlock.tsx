import React, { useState, useEffect } from 'react';
import delay from '../utils/delay';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../theme';
import { StatusEvent } from '../types';

interface Props {
  statusEvent: StatusEvent | undefined;
}

export const StatusBlock: React.FC<Props> = ({ statusEvent }) => {
  const [isDelayed, setIsDelayed] = useState(false);

  useEffect(() => {
    const timeout = delay(1000);

    (async () => {
      setIsDelayed(true);
      await timeout;
      setIsDelayed(false);
    })();

    return () => {
      timeout.cancel();
    };
  }, [statusEvent]);

  return (
    <View style={styles.container}>
      <Text style={styles.status}>{isDelayed ? statusEvent?.status : ''}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 0.2,
  },
  status: {
    fontSize: 20,
    color: COLORS.WHITE,
    textAlign: 'center',
  },
});
