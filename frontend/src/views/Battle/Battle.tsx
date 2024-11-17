import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import { Image } from 'expo-image';
import { StackProps } from '@navigator/stack';
import { colors } from '@theme';

const bossSize = 250;
const gifSize = 150;

export default function Battle({ navigation }: StackProps) {
  const boss = [
    require('assets/images/boss/デブリオン.png'),
    require('assets/images/boss/attacked/デブリオン.gif'),
    require('assets/images/boss/damage/デブリオン.gif'),
    require('assets/images/boss/デブリオン.png'),
    require('assets/images/boss/attack/デブリオン.gif'),
  ];

  const gomingo1 = [
    require('assets/images/battle/ビニりん.png'),
    require('assets/images/attack/ビニりん.gif'),
    require('assets/images/battle/ビニりん.png'),
    require('assets/images/battle/ビニりん.png'),
    require('assets/images/damage/ビニりん.gif'),
  ];

  const gomingo2 = [
    require('assets/images/battle/ビンボーイ.png'),
    require('assets/images/attack/ビンボーイ.gif'),
    require('assets/images/battle/ビンボーイ.png'),
    require('assets/images/battle/ビンボーイ.png'),
    require('assets/images/damage/ビンボーイ.gif'),
  ];

  const gomingo3 = [
    require('assets/images/battle/テシウ.png'),
    require('assets/images/attack/テシウ.gif'),
    require('assets/images/battle/テシウ.png'),
    require('assets/images/battle/テシウ.png'),
    require('assets/images/damage/テシウ.gif'),
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [bossHp, setBossHp] = useState(100);
  const [playerHp, setPlayerHp] = useState(100);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (bossHp <= 0) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        navigation.navigate('BattleSuccessStack');
      }, 2000);
    } else if (playerHp <= 0) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [bossHp, playerHp]);

  const handleNextImage = () => {
    if (bossHp <= 0) return;
    if (playerHp <= 0) return;
    setCurrentImageIndex(prevIndex => (prevIndex + 1) % gomingo1.length);
    if (currentImageIndex === 1) {
      setBossHp(prev => Math.min(100, prev - 20));
    } else if (currentImageIndex === 3) {
      setPlayerHp(prev => Math.min(100, prev - 10));
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleNextImage}>
      <View style={styles.root}>
        <StatusBar barStyle="light-content" />
        <Image source={require('assets/images/background_battle.jpg')} style={styles.bg} />
        <Animated.View style={[styles.boss, { opacity: fadeAnim }]}>
          <Image source={boss[currentImageIndex]} style={styles.boss} />
        </Animated.View>
        <Image source={gomingo1[currentImageIndex]} style={styles.left} />
        <Image source={gomingo2[currentImageIndex]} style={styles.right} />
        <Image source={gomingo3[currentImageIndex]} style={styles.center} />

        <Animated.View style={[styles.hpBarContainer, { opacity: fadeAnim }]}>
          <View style={[styles.hpBar, { width: `${bossHp}%` }]} />
          <Text style={styles.hpText}>デブリオン HP: {bossHp}%</Text>
        </Animated.View>

        <View style={[styles.hpBarContainer, { top: '85%' }]}>
          <View style={[styles.hpBar, { width: `${playerHp}%` }]} />
          <Text style={[styles.hpText]}>ゴミンゴたち HP: {playerHp}%</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  bg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  boss: {
    position: 'absolute',
    width: bossSize,
    height: bossSize,
    top: '40%',
    left: '52%',
    transform: [{ translateX: -bossSize / 2 }, { translateY: -bossSize / 2 }],
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
  hpBarContainer: {
    position: 'absolute',
    width: '80%',
    height: 20,
    top: '10%',
    left: '10%',
    backgroundColor: '#ddd',
    borderRadius: 10,
    overflow: 'hidden',
  },
  hpBar: {
    height: '100%',
    backgroundColor: colors.orange,
  },
  text: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },
  hpText: {
    position: 'absolute',
    top: '11%',
    left: '10%',
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
    width: '80%',
  },
});
