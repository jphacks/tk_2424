import React from 'react';
import { View, StyleSheet, StatusBar, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { StackProps } from '@navigator/stack';
import { colors } from '@theme';

const gifSize = 150;
const itemSize = 100;

export default function BattleSuccess({ navigation }: StackProps) {
  const handleGoToMap = () => {
    navigation.navigate('MapStack');
  };
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <Image source={require('assets/images/background_battle.jpg')} style={styles.bg} />
      <Image source={require('assets/images/battle/success/テシウ.png')} style={styles.center} />
      <Image source={require('assets/images/battle/success/binirin.png')} style={styles.left} />
      <Image source={require('assets/images/battle/success/binboy.png')} style={styles.right} />
      <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={[styles.text, { marginTop: 40 }]}>デブリオンに勝利した！</Text>
        <Text style={[styles.text, { fontSize: 18, marginTop: 30 }]}>
          新しいアクセサリーをゲットした
        </Text>
      </View>
      <Image source={require('assets/images/item/ネクタイ.png')} style={styles.item} />
      <TouchableOpacity style={[styles.button]} onPress={handleGoToMap}>
        <Text style={styles.buttonText}>戻る</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  bg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  button: {
    width: 100,
    height: 50,
    borderRadius: 20,
    backgroundColor: colors.orange,
    position: 'absolute',
    bottom: -20,
    left: '50%',
    transform: [{ translateX: -100 / 2 }, { translateY: -100 / 2 }],
  },
  item: {
    position: 'absolute',
    width: itemSize,
    height: itemSize,
    top: '35%',
    left: '50%',
    transform: [{ translateX: -itemSize / 2 }, { translateY: -itemSize / 2 }],
  },
  center: {
    position: 'absolute',
    width: gifSize,
    height: gifSize,
    top: '70%',
    left: '52%',
    transform: [{ translateX: -gifSize / 2 }, { translateY: -gifSize / 2 }],
  },
  right: {
    position: 'absolute',
    width: gifSize,
    height: gifSize,
    top: '60%',
    left: '85%',
    transform: [{ translateX: -gifSize / 2 }, { translateY: -gifSize / 2 }],
  },
  left: {
    position: 'absolute',
    width: gifSize,
    height: gifSize,
    top: '60%',
    left: '20%',
    transform: [{ translateX: -gifSize / 2 }, { translateY: -gifSize / 2 }],
  },
  text: { textAlign: 'center', fontWeight: 'bold', fontSize: 28, color: colors.white },
  buttonText: { margin: 'auto', fontWeight: 'bold', fontSize: 20 },
});
