import React from 'react';
import { COLORS } from '../theme';
import { View, Text, StyleSheet, Image } from 'react-native';

interface Props {
  name: string;
  count: number;
  isPerson: boolean;
}

export const PlayerScore: React.FC<Props> = ({ name, count, isPerson }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={
          isPerson          
            ? require('../assets/person.png')
            : require('../assets/brain.png')
        }
        borderRadius={40 / 2}
      />
      <View style={styles.blockName}>
        <Text style={styles.name}>{name}</Text>
      </View>
      <Text style={styles.score}>{count}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    marginTop: 10,
    flexDirection: 'row',
    backgroundColor: COLORS.GRAY,
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 60 / 2,
  },
  blockName: {
    justifyContent: 'flex-start',
    flex: 1,
    marginHorizontal: 10,
  },
  name: {
    fontSize: 20,
    color: COLORS.WHITE,
  },
  image: {
    width: 40,
    height: 40,
    borderColor: COLORS.GOLD,
    backgroundColor: COLORS.WHITE,
    borderWidth: 3,
  },
  score: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.GOLD,
    marginHorizontal: 15,
  },
});
