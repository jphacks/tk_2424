import { FC } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { MapMarkerProps, Marker } from 'react-native-maps';
import { Image } from 'expo-image';

import { BeatButton } from './BeatButton';
import BossModal from './BossModal';

type BossMarkerProps = {
  bossName: string;
  bossModalVisible: boolean;
  setBossModalVisible: (visible: boolean) => void;
  handleGoToBattle: () => void;
} & MapMarkerProps;

const viewContainerLength = 300;
const roundLength = 250;
const borderTWidth = 55;

const borderLRWidth = borderTWidth / 3;
const pinHeight = viewContainerLength / 2 - borderTWidth;

export const BossMarker: FC<BossMarkerProps> = ({
  bossName,
  bossModalVisible,
  setBossModalVisible,
  handleGoToBattle,
  ...restProps
}) => {
  return (
    <Marker
      anchor={{ x: 0.5, y: 0.5 }} // 座標をマーカーの中央に合わせる
      {...restProps}>
      <View style={styles.base}>
        {/* 丸い部分 */}
        <View style={styles.circle} />
        <View style={styles.whiteCircle}>
          <Text style={{ paddingTop: 20, fontWeight: 'bold' }}>新宿区 危険度B</Text>
          <Image
            source={require('assets/images/boss/デブリオン.png')}
            style={{ width: 120, height: 120 }}
          />
          <Text style={{ paddingBottom: 5, fontWeight: 'bold' }}>
            <Text style={{ color: 'red' }}>{bossName}</Text>出現中
          </Text>
          <BeatButton onClick={() => setBossModalVisible(true)} />
        </View>
        {/* 三角形部分（ピンの先端） */}
        <View style={styles.triangle} />
      </View>
      <BossModal
        bossModalVisible={bossModalVisible}
        setBossModalVisible={setBossModalVisible}
        handleGoToBattle={handleGoToBattle}
        visible={bossModalVisible}
        onRequestClose={() => setBossModalVisible(false)}
      />
    </Marker>
  );
};

const styles = StyleSheet.create({
  base: { alignItems: 'center', width: viewContainerLength, height: viewContainerLength },
  circle: {
    width: roundLength,
    height: roundLength,
    borderRadius: roundLength / 2,
    backgroundColor: 'red',
    zIndex: 1, // 丸を前面に配置
    position: 'absolute',
    top: -145,
  },
  whiteCircle: {
    width: roundLength * 0.92,
    height: roundLength * 0.92,
    borderRadius: roundLength / 2,
    backgroundColor: '#fff',
    zIndex: 1, // 丸を前面に配置
    position: 'absolute',
    top: -136,
    alignItems: 'center',
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: borderLRWidth,
    borderRightWidth: borderLRWidth,
    borderTopWidth: borderTWidth,
    borderBottomWidth: 0,
    borderTopColor: 'red',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    position: 'absolute',
    top: pinHeight, // 丸と三角形がつながるように調整
  },
});

export default BossMarker;
