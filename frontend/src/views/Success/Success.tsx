import { StatusBar, View, StyleSheet, Text, Button } from 'react-native';
import { Image } from 'expo-image';
import { characters, CharacterType } from 'assets/data/character';
import { StackProps } from '@navigator';
import { useState } from 'react';

const imageSize = 300;

const styles = StyleSheet.create({
  root: { flex: 1, margin: 20 },
  image: {
    margin: 'auto',
    width: imageSize,
    height: imageSize,
  },
  text: { margin: 'auto', fontSize: 18 },
  bg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});

const dice = (n: number) => {
  return Math.floor(Math.random() * n) + 1;
};

export default function Friend({ navigation }: StackProps) {
  const randomCharacter = characters[dice(5)];
  const [character, setCharacter] = useState<CharacterType | null>(randomCharacter);

  const returnToMap = () => {
    navigation.navigate('MapStack');
    setCharacter(null);
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <Image source={require('assets/images/success.png')} style={styles.bg} />
      <View style={{ width: '100%', height: '100%' }}>
        <Text style={styles.text}>{character?.name}が焚き火に参加した！</Text>
        <Image source={character?.image} style={styles.image} />
        <Button title="Mapに戻る" onPress={returnToMap} />
      </View>
    </View>
  );
}
