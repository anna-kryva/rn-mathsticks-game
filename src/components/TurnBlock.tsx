import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../theme';

interface Props {
  name: string;
}

export const TurnBlock: React.FC<Props> = ({ name }) => {
  return (
    <View style={styles.turnBlock}>
      <Text style={styles.turn}>{name}</Text>
      <Text style={styles.turnLabel}> to move</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  turnBlock: {
    flex: 0.4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  turn: {
    fontSize: 26,
    fontStyle: 'italic',
    color: COLORS.GOLD,
  },
  turnLabel: {
    fontSize: 24,
    color: COLORS.WHITE,
  },
});
