import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../theme';

interface Props {
  count: number;
}

export const MatchesLeft: React.FC<Props> = ({ count }) => {
  return (
    <View style={styles.leftBlock}>
          <Text style={styles.leftLabel}>Matches left: </Text>
          <Text style={styles.left}>{count}</Text>
        </View>
  );
};

const styles = StyleSheet.create({
  leftBlock: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderColor: COLORS.GOLD,
    borderWidth: 2,
    marginRight: 10,
    borderRadius: 5,
  },
  leftLabel: {
    color: COLORS.WHITE,
    fontSize: 20,
    fontStyle: 'italic',
  },
  left: {
    color: COLORS.GOLD,
    fontSize: 20,
  },
});
