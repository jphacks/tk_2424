import React, { useRef, useState } from 'react';

import { CameraCapturedPicture, CameraView, useCameraPermissions } from 'expo-camera';
import { Button, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StackProps } from '@navigator';

export default function Camera({ navigation, route }: StackProps) {
  const [permission, requestPermission] = useCameraPermissions();
  const camera = useRef<CameraView>(null);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  async function takePicture() {
    if (camera.current) {
      try {
        const photo = (await camera.current.takePictureAsync()) as CameraCapturedPicture;
        setPhotoUri(photo.uri);
        setModalVisible(true);
        console.log('Photo taken:', photo?.uri);
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
  }

  function handleSend() {
    console.log('Photo sent:', photoUri);
    setModalVisible(false);
    setPhotoUri(null);
    navigation.navigate('FriendStack', { url: '' });
  }

  function handleCancel() {
    setModalVisible(false);
    setPhotoUri(null); // 写真のURIをクリア
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} ref={camera}>
        <View style={styles.overlay}>
          <Text style={[styles.text, { marginBottom: 25 }]}>マル枠にゴミを合わせてね！</Text>
          <View style={styles.circle} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <View style={styles.outerCircle}>
              <View style={styles.innerCircle} />
            </View>
          </TouchableOpacity>
        </View>
      </CameraView>
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginBottom: -30,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 280, // サークルの直径
    height: 280,
    borderRadius: 150, // 半径 = 直径 / 2
    borderWidth: 5,
    borderColor: 'white', // サークルの色
    backgroundColor: 'transparent', // 背景を透明に
  },
  outerCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 5,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
  },
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
