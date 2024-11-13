import React, { FC, useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '@theme';

type ConditionsButtonProps = {
  garbageStatus: string;
  binStatus: string;
  setGarbageStatus: (status: string) => void;
  setBinStatus: (status: string) => void;
};

export const ConditionsButton: FC<ConditionsButtonProps> = ({
  garbageStatus,
  binStatus,
  setGarbageStatus,
  setBinStatus,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  // モーダルを閉じる関数
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>
          表示状態 ゴミ:{garbageStatus}, ゴミ箱:{binStatus}
        </Text>
      </TouchableOpacity>

      {/* モーダルの表示 */}
      <Modal animationType="fade" transparent visible={modalVisible} onRequestClose={closeModal}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>表示設定</Text>

            {/* ゴミの選択 */}
            <Text style={styles.optionTitle}>ゴミの表示設定</Text>
            <TouchableOpacity
              style={[
                styles.optionButton,
                { backgroundColor: garbageStatus === '全て表示' ? colors.turquoise : '#eee' },
              ]}
              onPress={() => setGarbageStatus('全て表示')}>
              <Text style={styles.optionText}>全て表示</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.optionButton,
                { backgroundColor: garbageStatus === '廃棄前' ? colors.turquoise : '#eee' },
              ]}
              onPress={() => setGarbageStatus('廃棄前')}>
              <Text style={styles.optionText}>廃棄前</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.optionButton,
                { backgroundColor: garbageStatus === '廃棄済' ? colors.turquoise : '#eee' },
              ]}
              onPress={() => setGarbageStatus('廃棄済')}>
              <Text style={styles.optionText}>廃棄済</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.optionButton,
                { backgroundColor: garbageStatus === '非表示' ? colors.turquoise : '#eee' },
              ]}
              onPress={() => setGarbageStatus('非表示')}>
              <Text style={styles.optionText}>非表示</Text>
            </TouchableOpacity>

            {/* ゴミ箱の選択 */}
            <Text style={styles.optionTitle}>ゴミ箱の表示設定:</Text>
            <TouchableOpacity
              style={[
                styles.optionButton,
                { backgroundColor: binStatus === '表示' ? colors.turquoise : '#eee' },
              ]}
              onPress={() => setBinStatus('表示')}>
              <Text style={styles.optionText}>表示</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.optionButton,
                { backgroundColor: binStatus === '非表示' ? colors.turquoise : '#eee' },
              ]}
              onPress={() => setBinStatus('非表示')}>
              <Text style={styles.optionText}>非表示</Text>
            </TouchableOpacity>

            {/* 閉じるボタン */}
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>閉じる</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderBottomStartRadius: 8,
    borderBottomEndRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 320,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  optionTitle: {
    fontSize: 16,
    marginTop: 10,
    color: '#555',
    fontWeight: '600',
  },
  selectedText: {
    fontSize: 14,
    marginVertical: 10,
    color: '#333',
    fontWeight: '500',
  },
  closeButton: {
    backgroundColor: colors.orange,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  optionButton: {
    paddingVertical: 12,
    width: '100%',
    borderRadius: 8,
    marginVertical: 5,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
});

export default ConditionsButton;
