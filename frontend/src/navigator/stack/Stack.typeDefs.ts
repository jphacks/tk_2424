import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type StackParamList = {
  MapStack: undefined;
  BonfireStack: undefined;
  BookStack: undefined;
  CameraStack: undefined;
  FriendStack: undefined;
  // add more screen props...
};

export type StackProps = NativeStackScreenProps<StackParamList, keyof StackParamList>;
