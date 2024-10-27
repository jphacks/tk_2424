import Characters, { progressList } from '@components/Characters';
import React from 'react';
import { View, StatusBar } from 'react-native';

export default function Book() {
  return (
    <View>
      <StatusBar barStyle="light-content" />
      <Characters progressList={progressList} />
    </View>
  );
}
