import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { Image } from 'expo-image';
import { StackProps } from '@navigator/stack';
import LevelBar from '@components/StatusBar';

const levelBarSize = 150;
const bonfireSize = 200;
const gifSize = 150;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  LevelBar: {
    position: 'absolute',
    width: levelBarSize,
    top: '50%',
    left: '50%',
    transform: [{ translateX: -levelBarSize / 2 }, { translateY: -levelBarSize / 2 }],
  },
  bg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  bonfire: {
    position: 'absolute',
    width: bonfireSize,
    height: bonfireSize,
    top: '60%',
    left: '52%',
    transform: [{ translateX: -bonfireSize / 2 }, { translateY: -bonfireSize / 2 }],
  },
  rightGif: {
    position: 'absolute',
    width: gifSize,
    height: gifSize,
    top: '55%',
    left: '85%',
    transform: [{ translateX: -gifSize / 2 }, { translateY: -gifSize / 2 }],
  },
  leftGif: {
    position: 'absolute',
    width: gifSize,
    height: gifSize,
    top: '55%',
    left: '20%',
    transform: [{ translateX: -gifSize / 2 }, { translateY: -gifSize / 2 }],
  },
});

export default function Bonfire({ navigation }: StackProps) {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <LevelBar progress={0.5} style={styles.LevelBar} />
      <Image source={require('assets/images/background.png')} style={styles.bg} />
      <Image source={require('assets/images/bonfire/カンミナ.gif')} style={styles.rightGif} />
      <Image source={require('assets/images/bonfire/ダンビー.gif')} style={styles.leftGif} />
      <Image source={require('assets/images/焚き火.gif')} style={styles.bonfire} />
    </View>
  );
}