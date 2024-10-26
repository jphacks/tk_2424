import React, { useEffect, useState } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { StackProps } from '@navigator/stack';
import CameraButton from '@components/CameraButton';
import MapView, { Region, Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const initialRegion: Region = {
  latitude: 35.70608129247215,
  longitude: 139.70700462359696,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

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
});

export default function Map({ navigation }: StackProps) {
  const [region, setRegion] = useState<Region>(initialRegion);

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
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <MapView
        style={{ flex: 1 }}
        showsUserLocation
        mapPadding={{ top: 0, right: 0, bottom: 20, left: 10 }}
        initialRegion={initialRegion}>
        {region && <Marker coordinate={region} title="You are here" />}
        <Marker
          coordinate={tokyoTower}
          title="Tokyo Tower"
          description="This is a famous landmark in Tokyo"
        />
      </MapView>
      <CameraButton
        style={styles.cameraButton}
        onPress={() => navigation.navigate('CameraStack')}
      />
    </View>
  );
}
