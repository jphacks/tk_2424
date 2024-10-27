import { colors } from '@theme';
import { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

type DiscardButtonProps = {
  onClick: () => void;
  style: any;
};

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 50,
    borderRadius: 20,
    backgroundColor: colors.orange,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 'auto',
  },
});

export const DiscardButton: FC<DiscardButtonProps> = ({ onClick, style }) => {
  return (
    <View style={style}>
      <TouchableOpacity style={styles.button} onPress={onClick}>
        <Text style={styles.text}>捨てる</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DiscardButton;
