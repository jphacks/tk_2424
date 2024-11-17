import React, { useState } from 'react';
import { View, StyleSheet, StatusBar, TouchableOpacity, Text, Modal } from 'react-native';
import { Image } from 'expo-image';
import { StackProps } from '@navigator/stack';
import { colors } from '@theme';

const levelBarSize = 150;
const bonfireSize = 200;
const gifSize = 150;
const backGifSize = 170;

type CharactersItem = {
  [key: string]: any;
};

const charactersItem: CharactersItem = {
  カンミナ: require('assets/images/item/ネクタイ.png'),
  ダンビー: require('assets/images/item/帽子.png'),
  ビンボーイ: null,
  テシウ: null,
};

export default function Bonfire({ navigation }: StackProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);
  const [danItem, setDanItem] = useState(false);
  const [canItem, setCanItem] = useState(false);

  const handleSelectCharacter = (character: string) => {
    setSelectedCharacter(character);
    setModalVisible(true);
  };

  const itemState = (character: string) => {
    if (character === 'ダンビー') {
      return danItem;
    } else if (character === 'カンミナ') {
      return canItem;
    }
  };

  const handleToggleItem = (character: string) => {
    if (character === 'ダンビー') {
      setDanItem(!danItem);
    } else if (character === 'カンミナ') {
      setCanItem(!canItem);
    }
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <Image source={require('assets/images/background.png')} style={styles.bg} />
      <TouchableOpacity style={styles.rightGif} onPress={() => handleSelectCharacter('カンミナ')}>
        <Image
          source={
            canItem
              ? require('assets/images/fit/カンミナ.gif')
              : require('assets/images/bonfire/カンミナ.gif')
          }
          style={styles.gifSize}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.leftGif} onPress={() => handleSelectCharacter('ダンビー')}>
        <Image
          source={
            danItem
              ? require('assets/images/fit/ダンビー.gif')
              : require('assets/images/bonfire/ダンビー.gif')
          }
          style={styles.gifSize}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.leftbackGif}
        onPress={() => handleSelectCharacter('ビンボーイ')}>
        <Image source={require('assets/images/back/ビンボーイ.png')} style={styles.backGifSize} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.rightbackGif} onPress={() => handleSelectCharacter('テシウ')}>
        <Image source={require('assets/images/back/テシウ.png')} style={styles.backGifSize} />
      </TouchableOpacity>
      <Image source={require('assets/images/焚き火.gif')} style={styles.bonfire} />
      <Modal animationType="fade" transparent visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 10 }}>
              {selectedCharacter}
            </Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20 }}>
              装備できるアイテム
            </Text>
            {charactersItem[selectedCharacter as string] ? (
              <TouchableOpacity
                style={{
                  marginTop: 20,
                  width: 60,
                  height: 60,
                  backgroundColor: itemState(selectedCharacter as string)
                    ? colors.turquoise
                    : '#eee',
                }}
                onPress={() => handleToggleItem(selectedCharacter as string)}>
                <Image
                  source={charactersItem[selectedCharacter as string]}
                  style={{ width: 60, height: 60 }}
                />
              </TouchableOpacity>
            ) : (
              <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20 }}>なし</Text>
            )}

            <View>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.orange, marginTop: 20 }]}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>戻る</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  LevelBar: {
    position: 'absolute',
    width: levelBarSize,
    height: levelBarSize,
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
    top: '55%',
    left: '85%',
    transform: [{ translateX: -gifSize / 2 }, { translateY: -gifSize / 2 }],
  },
  leftGif: {
    position: 'absolute',
    top: '55%',
    left: '20%',
    transform: [{ translateX: -gifSize / 2 }, { translateY: -gifSize / 2 }],
  },
  leftbackGif: {
    position: 'absolute',
    width: backGifSize,
    height: backGifSize,
    top: '85%',
    left: '28%',
    transform: [{ translateX: -backGifSize / 2 }, { translateY: -backGifSize / 2 }],
  },
  rightbackGif: {
    position: 'absolute',
    width: backGifSize,
    height: backGifSize,
    top: '82%',
    left: '72%',
    transform: [{ translateX: -backGifSize / 2 }, { translateY: -backGifSize / 2 }],
  },
  gifSize: {
    width: gifSize,
    height: gifSize,
  },
  backGifSize: {
    width: backGifSize,
    height: backGifSize,
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
  bossText: { fontSize: 20, fontWeight: 'bold' },
  bossImage: { width: 200, height: 200 },
  bossDetail: { fontSize: 12, marginTop: 2 },
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
