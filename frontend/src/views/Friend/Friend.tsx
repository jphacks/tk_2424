import { StatusBar, View, StyleSheet, Text, Button } from 'react-native';
import { Image } from 'expo-image';
import { characters, CharacterType } from 'assets/data/character';
import { StackProps } from '@navigator';
import { useState } from 'react';

const imageSize = 300;

const styles = StyleSheet.create({
  root: { flex: 1, margin: 40 },
  image: {
    margin: 'auto',
    width: imageSize,
    height: imageSize,
  },
  text: { margin: 'auto', fontSize: 18 },
});

// const dice = (n: number) => {
//   return Math.floor(Math.random() * n) + 1;
// };

export default function Friend({ navigation }: StackProps) {
  const randomCharacter = characters[1];
  const [character, setCharacter] = useState<CharacterType | null>(randomCharacter);

  const returnToMap = () => {
    navigation.navigate('MapStack');
    setCharacter(null);
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.text}>{character?.name}が一緒に来たがっている！</Text>
      <Image source={character?.image} style={styles.image} />
      <Text style={styles.text}>
        見つけたゴミをゴミ箱に捨てて
        {'\n'}
        {character?.name}を焚き火に呼ぼう！
      </Text>
      <Button title="Mapに戻る" onPress={returnToMap} />
    </View>
  );
}
