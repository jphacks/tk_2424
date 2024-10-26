import { FC } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type CameraButtonProps = {
  onPress?: () => void;
  style?: any;
};

const styles = StyleSheet.create({
  button: {
    width: 75,
    height: 75,
    backgroundColor: '#F1C073',
    borderRadius: 50,
  },
  icon: {
    margin: 'auto',
    color: 'white',
  },
});

export const CameraButton: FC<CameraButtonProps> = ({ onPress, style }) => {
  return (
    <View style={style}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <MaterialCommunityIcons name="camera-outline" size={50} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

export default CameraButton;
