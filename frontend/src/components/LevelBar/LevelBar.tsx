import { FC } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { colors } from '@theme';
import * as Progress from 'react-native-progress';

type LevelBarProps = { progress: number; style: any };

const styles = StyleSheet.create({
  LevelBar: {
    width: 300,
  },
  topBar: {
    width: '100%',
    height: 30,
    backgroundColor: 'white',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  bottomBar: {
    width: '100%',
    height: 30,
    backgroundColor: colors.turquoise,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  text: { fontSize: 20 },
  progressBar: {
    margin: 'auto',
    width: '80%',
  },
});

export const LevelBar: FC<LevelBarProps> = ({ progress, style }) => {
  return (
    <View style={style}>
      <View style={styles.LevelBar}>
        <View style={styles.topBar}>
          <Text style={styles.text}>ステータス</Text>
        </View>
        <View style={styles.bottomBar}>
          <Progress.Bar progress={progress} style={styles.progressBar} />
        </View>
      </View>
    </View>
  );
};

export default LevelBar;
