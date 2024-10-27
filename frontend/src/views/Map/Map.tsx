import React, { useEffect, useState } from 'react';
import { View, StyleSheet, StatusBar, ActivityIndicator, Button, Modal, Text } from 'react-native';
import { StackProps } from '@navigator/stack';
import CameraButton from '@components/CameraButton';
import { Image } from 'expo-image';
import MapView, { Region, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { trushCan } from '@assets/data/trushCan';
// import { trush } from '@assets/data/trush';
// import { useSWRGarbageCans } from 'src/api/fetchGarbageCans';
import DiscardButton from '@components/DiscardButton';

const tokyoTower = {
  latitude: 35.6586,
  longitude: 139.7454,
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 25,
    right: 25,
  },
  discardButton: {
    position: 'absolute',
    bottom: 27,
    left: '36%',
  },
  garbageLogo: {
    width: 120,
    height: 120,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

export default function Map({ navigation }: StackProps) {
  const [region, setRegion] = useState<Region | null>(null);
  // const [discardButton, setdiscardButton] = useState<boolean>(false);
  // const [isAbleToDiscarded, setIsAbleToDiscarded] = useState<boolean>(false);
  const [trush, setTrush] = useState<any[]>([]);
  // const { garbageCans } = useSWRGarbageCans();
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  function handleSend() {
    setModalVisible(false);
    setPhotoUri(null);
    // 写真を送信するロジックをここに追加
    navigation.navigate('SuccessStack');
  }

  function handleCancel() {
    setModalVisible(false);
    setPhotoUri(null); // 写真のURIをクリア
  }

  useEffect(() => {
    const requestLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    };

    requestLocationPermission();
  }, []);

  // 位置情報が取得できるまでローディングインジケーターを表示
  if (!region) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <MapView
        style={{ flex: 1 }}
        showsUserLocation
        mapPadding={{ top: 0, right: 0, bottom: 20, left: 10 }}
        region={region}>
        <Marker
          coordinate={tokyoTower}
          title="Tokyo Tower"
          description="This is a famous landmark in Tokyo">
          <Image
            source={require('assets/images/discarded_garbage.png')}
            style={styles.garbageLogo}
          />
        </Marker>
        {trushCan.map((item, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: item.latitude, longitude: item.longitude }}
            title={item.type}>
            <Image source={require('assets/images/trash_can.png')} style={styles.garbageLogo} />
          </Marker>
        ))}
        {trush.map((item, index) => (
          <Marker key={index} coordinate={{ latitude: item.latitude, longitude: item.longitude }}>
            <Image
              source={
                item.isDiscarded
                  ? require('assets/images/discarded_garbage.png')
                  : require('assets/images/garbage.png')
              }
              style={styles.garbageLogo}
            />
          </Marker>
        ))}
      </MapView>
      <DiscardButton
        style={styles.discardButton}
        onClick={() => {
          setModalVisible(true);
        }}
      />
      <CameraButton
        style={styles.cameraButton}
        onPress={() => navigation.navigate('CameraStack')}
      />
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
