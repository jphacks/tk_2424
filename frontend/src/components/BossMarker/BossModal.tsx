import { FC } from 'react';
import { Modal, View, Text, StyleSheet, ModalProps, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { colors } from '@theme';

type BossModalProps = {
  bossModalVisible: boolean;
  setBossModalVisible: (visible: boolean) => void;
  handleGoToBattle: () => void;
} & ModalProps;

export const BossModal: FC<BossModalProps> = ({
  bossModalVisible,
  setBossModalVisible,
  handleGoToBattle,
  ...restProps
}) => {
  return (
    <Modal animationType="fade" transparent {...restProps}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.bossText}>デブリオン出現中</Text>
          <Image source={require('assets/images/boss/デブリオン.png')} style={styles.bossImage} />
          <Text style={styles.bossDetail}>
            街中に捨てられたゴミが集まりすぎた結果、悪意と怨念が形を持った存在。捨てられた者たちの無念が渦巻き、ドラゴンの形となってこの世に現れた。その姿を見た者は、、街のどこかに散らばったゴミたちの叫びを聞くことになる。誰もが「ゴミを捨てるな」という声を無視した結果、彼が生まれるのだ。
          </Text>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 30 }}>
            討伐に行きますか？
          </Text>
          <View style={styles.bossButtonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.orange }]}
              onPress={handleGoToBattle}>
              <Text style={styles.buttonText}>はい</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#ddd' }]}
              onPress={() => setBossModalVisible(false)}>
              <Text style={styles.buttonText}>やめる</Text>
            </TouchableOpacity>
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
  bossText: { fontSize: 20, fontWeight: 'bold' },
  bossImage: { width: 200, height: 200 },
  bossDetail: { fontSize: 12, marginTop: 2 },
  bossButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    width: 100,
    height: 50,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 'auto',
  },
});

export default BossModal;
