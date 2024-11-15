import { colors } from '@theme';
import { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

type BeatButtonProps = {
  onClick: () => void;
  style?: any;
};

const styles = StyleSheet.create({
  button: {
    width: 80,
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.orange,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    margin: 'auto',
  },
});

export const BeatButton: FC<BeatButtonProps> = ({ onClick, style }) => {
  return (
    <View style={style}>
      <TouchableOpacity style={styles.button} onPress={onClick}>
        <Text style={styles.text}>討伐に行く</Text>
      </TouchableOpacity>
    </View>
  );
};
