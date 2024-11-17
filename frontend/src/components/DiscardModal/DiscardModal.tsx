import { FC } from 'react';
import { Modal, Text, StyleSheet, View, Button, ModalProps } from 'react-native';

type DiscardModalProps = {
  handleSend: () => void;
  handleCancel: () => void;
} & ModalProps;

export const DiscardModal: FC<DiscardModalProps> = ({ handleSend, handleCancel, ...restProps }) => {
  return (
    <Modal animationType="fade" transparent {...restProps}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text>送信しますか？</Text>
          <View style={styles.modalButtons}>
            <View style={{ marginLeft: 25 }}>
              <Button title="送信" onPress={handleSend} />
            </View>
            <Button title="キャンセル" onPress={handleCancel} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default DiscardModal;
