import React, { useEffect, useState } from 'react';
import { View, StyleSheet, StatusBar, ActivityIndicator } from 'react-native';
import { StackProps } from '@navigator/stack';
import CameraButton from '@components/CameraButton';
import { Image } from 'expo-image';
import MapView, { Region, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { trashCan } from '@assets/data/trashCan';
import { trash } from '@assets/data/trash';
import { colors } from '@theme';
// import { useSWRGarbageCans } from 'src/api/fetchGarbageCans';
import DiscardButton from '@components/DiscardButton';
import ConditionsButton from '@components/ConditionsButton';
import DiscardModal from '@components/DiscardModal';
import BossMarker from '@components/BossMarker';
// import { useSWRGarbage } from 'src/api/fetchGarbage';
// import { useSWRGarbageCans } from 'src/api/fetchGarbageCans';

export default function Map({ navigation }: StackProps) {
  // const { garbage } = useSWRGarbage();
  // const { garbageCans } = useSWRGarbageCans();
  // console.log('garbageCans', garbageCans);
  const [region, setRegion] = useState<Region | null>(null);
  const [trashList, setTrashesList] = useState<any[]>(trash);

  // const { garbageCans } = useSWRGarbageCans();
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // ConditionsButtonのstate管理
  const [garbageStatus, setGarbageStatus] = useState('全て表示');
  const [binStatus, setBinStatus] = useState('表示');

  // BossMarkerのstate管理
  const [bossModalVisible, setBossModalVisible] = useState(false);

  function handleSend() {
    setModalVisible(false);
    setPhotoUri(null);
    // todo: 写真を送信するロジックをここに追加
    navigation.navigate('SuccessStack');
  }

  function handleCancel() {
    setModalVisible(false);
    setPhotoUri(null); // 写真のURIをクリア
  }

  function handleGoToBattle() {
    setBossModalVisible(false);
    navigation.navigate('BattleStack');
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
        <ActivityIndicator size={2} color={colors.green} />
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
        <ConditionsButton
          garbageStatus={garbageStatus}
          binStatus={binStatus}
          setGarbageStatus={setGarbageStatus}
          setBinStatus={setBinStatus}
        />
        {binStatus === '表示'
          ? // ? (Array.isArray(garbageCans) && garbageCans.length > 0 ? garbageCans : trashCan).map(
            trashCan.map((item, index) => (
              <Marker
                tappable={false}
                key={index}
                coordinate={{ latitude: item.latitude, longitude: item.longitude }}>
                <Image source={require('assets/images/trash_can.png')} style={styles.garbageLogo} />
              </Marker>
            ))
          : null}
        {garbageStatus === '全て表示'
          ? trashList.map((item, index) => (
              <Marker
                tappable={false}
                key={index}
                coordinate={{ latitude: item.latitude, longitude: item.longitude }}>
                <Image
                  source={
                    item.isDiscarded
                      ? require('assets/images/discarded_garbage.png')
                      : require('assets/images/garbage.png')
                  }
                  style={styles.garbageLogo}
                />
              </Marker>
            ))
          : garbageStatus === '廃棄済'
            ? trashList.map((item, index) =>
                item.isDiscarded ? (
                  <Marker
                    tappable={false}
                    key={index}
                    coordinate={{ latitude: item.latitude, longitude: item.longitude }}>
                    <Image
                      source={require('assets/images/discarded_garbage.png')}
                      style={styles.garbageLogo}
                    />
                  </Marker>
                ) : null,
              )
            : garbageStatus === '廃棄前'
              ? trashList.map((item, index) =>
                  !item.isDiscarded ? (
                    <Marker
                      tappable={false}
                      key={index}
                      coordinate={{ latitude: item.latitude, longitude: item.longitude }}>
                      <Image
                        source={require('assets/images/garbage.png')}
                        style={styles.garbageLogo}
                      />
                    </Marker>
                  ) : null,
                )
              : null}
        <BossMarker
          style={{ zIndex: 100 }}
          bossName="デブリオン"
          bossModalVisible={bossModalVisible}
          setBossModalVisible={setBossModalVisible}
          handleGoToBattle={handleGoToBattle}
          tracksViewChanges={false}
          coordinate={{ latitude: 35.6905, longitude: 139.6995 }}
        />
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
      <DiscardModal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        handleSend={handleSend}
        handleCancel={handleCancel}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  garbageLogo: {
    width: 120,
    height: 120,
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
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customMarkerContainer: {
    alignItems: 'center',
  },
});
