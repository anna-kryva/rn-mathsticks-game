import React from 'react';
import { COLORS } from '../theme';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';

interface Props {
  numberOfMatches: number;
  onSubmit: (numberOfMatches: number) => void;
  disabled: boolean;
}

export const MatchButton: React.FC<Props> = ({ numberOfMatches, onSubmit, disabled }) => {
  const image =
    numberOfMatches == 1
      ? require('../assets/matches_1.png')
      : numberOfMatches == 2
      ? require('../assets/matches_2.png')
      : require('../assets/matches_3.png');

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        onSubmit(numberOfMatches);
      }}
      disabled={disabled}
    >
      <Image
        style={{
          ...styles.image,
          backgroundColor: disabled ? COLORS.GRAY : COLORS.WHITE,
        }}
        source={image}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {},
  image: {
    width: 60,
    height: 60,
    borderColor: COLORS.GOLD,
    borderWidth: 3,
    borderRadius: 60 / 2,
  },
});
