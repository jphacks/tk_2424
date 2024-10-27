import { FC, useState } from 'react';
import { StyleSheet, ScrollView, Text, View, TouchableOpacity, Modal } from 'react-native';
import { Image } from 'expo-image';
import { characters, CharacterType } from 'assets/data/character';

type CharactersProps = {
  progressList: { number: number; isCleared: boolean }[];
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    padding: 10,
  },
  characterContainer: {
    marginVertical: 30,
    marginHorizontal: 10,
  },
  imageContainer: {
    width: 80,
    height: 80,
  },
  image: {
    width: 80,
    height: 80,
    margin: 'auto',
  },
  unkwnownImage: {
    width: 60,
    height: 60,
    margin: 'auto',
    tintColor: 'gray',
  },
  text: {
    margin: 'auto',
    marginTop: 5,
    fontSize: 9,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalView: {
    width: '80%',
    height: '80%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 20,
    margin: 'auto',
  },
  description: {
    fontSize: 15,
    marginVertical: 30,
  },
  gif: {
    width: 200,
    height: 200,
  },
});

export const progressList = [
  { number: 1, isCleared: true },
  { number: 2, isCleared: true },
  { number: 3, isCleared: true },
  { number: 4, isCleared: true },
  { number: 5, isCleared: true },
  { number: 6, isCleared: true },
  { number: 7, isCleared: false },
  { number: 8, isCleared: false },
  { number: 9, isCleared: false },
  { number: 10, isCleared: false },
  { number: 11, isCleared: false },
  { number: 12, isCleared: false },
  { number: 13, isCleared: false },
  { number: 14, isCleared: false },
  { number: 15, isCleared: false },
  { number: 16, isCleared: false },
  { number: 17, isCleared: false },
  { number: 18, isCleared: false },
];

export const Characters: FC<CharactersProps> = ({ progressList }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterType | null>(null);

  const openModal = (character: CharacterType) => {
    setSelectedCharacter(character);
    setModalVisible(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Modal animationType="fade" transparent visible={modalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            {selectedCharacter ? (
              <>
                <Text style={styles.modalText}>
                  No.{selectedCharacter.number}{' '}
                  {progressList[selectedCharacter.number - 1].isCleared
                    ? selectedCharacter.name
                    : '???'}
                </Text>
                <Image
                  source={
                    progressList[selectedCharacter.number - 1].isCleared
                      ? selectedCharacter.bookGif
                        ? selectedCharacter.bookGif
                        : selectedCharacter.bonfireGif
                      : require('assets/images/unknown.png')
                  }
                  style={styles.gif}
                />
              </>
            ) : (
              <Text style={styles.modalText}>Loading...</Text>
            )}
            <Text style={styles.description}>{selectedCharacter?.description}</Text>
            <TouchableOpacity
              onPress={() => setModalVisible(!modalVisible)}
              style={{ width: 80, height: 40 }}>
              <Text style={styles.modalText}>戻る</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {characters.map((character, i) => {
        const isCleared = progressList[i].isCleared;
        return (
          <TouchableOpacity
            key={character.number}
            style={styles.characterContainer}
            onPress={() => openModal(character)}>
            <View style={styles.imageContainer}>
              <Image
                source={isCleared ? character.image : require('assets/images/unknown.png')}
                style={isCleared ? styles.image : styles.unkwnownImage}
              />
            </View>
            <Text style={styles.text}>
              No.{character.number} {isCleared ? character.name : '???'}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default Characters;
