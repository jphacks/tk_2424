import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type StackParamList = {
  MapStack: undefined;
  BonfireStack: undefined;
  BookStack: undefined;
  CameraStack: undefined;
  FriendStack: { url: string };
  SuccessStack: undefined;
  BattleStack: undefined;
  BattleSuccessStack: undefined;
  // add more screen props...
};

export type StackProps = NativeStackScreenProps<StackParamList, keyof StackParamList>;
