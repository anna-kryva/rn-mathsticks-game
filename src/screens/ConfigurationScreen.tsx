import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Switch,
} from 'react-native';
import { COLORS } from '../theme';
import { IConfiguration } from '../types';
import { WELCOME_MESSAGE } from '../constants';

interface Props {
  configuration: IConfiguration | undefined;
  startGame: (config: IConfiguration) => void;
}

export const ConfigurationScreen: React.FC<Props> = ({
  configuration,
  startGame,
}) => {
  const [name, setName] = useState<string>(configuration?.name ?? '');
  const [firstMoveByAI, setFirstMoveByAI] = useState<boolean>(
    configuration?.firstMoveByAI ?? false
  );

  const toggleSwitch = () =>
    setFirstMoveByAI((previousState) => !previousState);

  const pressHandler = () => {
    startGame({
      name,
      firstMoveByAI,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{WELCOME_MESSAGE}</Text>

      <View style={styles.inputBlock}>
        <Text style={styles.inputLabel}>Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="X AE A-12"
          maxLength={12}
          onChangeText={setName}
          value={name}
          autoCorrect={false}
        />
      </View>

      <View style={styles.switchBlock}>
        <Text style={styles.switchLabel}>The first move by AI</Text>
        <Switch
          onValueChange={toggleSwitch}
          value={firstMoveByAI}
          trackColor={{ false: COLORS.GRAY, true: COLORS.DARK_GOLD }}
          thumbColor={firstMoveByAI ? COLORS.GOLD : COLORS.WHITE}
        />
      </View>

      <View style={styles.buttonBlock}>
        <Button
          title="Start"
          color={COLORS.GOLD}
          onPress={pressHandler}
          disabled={name.trim() ? false : true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: COLORS.BLACK,
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.GOLD,
    padding: 10,
  },
  inputBlock: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    margin: 20,
    backgroundColor: COLORS.GRAY,
    borderRadius: 5,
  },
  inputLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.WHITE,
    padding: 10,
  },
  input: {
    flex: 0.9,
    padding: 10,
    fontSize: 18,
    color: COLORS.WHITE,
  },
  buttonBlock: {
    margin: 20,
  },
  switchBlock: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 20,
  },
  switchLabel: {
    color: COLORS.WHITE,
    fontSize: 20,
    fontStyle: 'italic',
  },
});
