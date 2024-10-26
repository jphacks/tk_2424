import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@theme';

type MailButtonProps = {
  unread: boolean;
  onPress?: () => void;
};

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    backgroundColor: colors.green,
    borderRadius: 50,
  },
  icon: {
    margin: 'auto',
  },
});

export const MailButton: FC<MailButtonProps> = ({ unread, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Ionicons
        name={unread ? 'mail-unread-outline' : 'mail-outline'}
        size={25}
        style={styles.icon}
      />
    </TouchableOpacity>
  );
};

export default MailButton;
