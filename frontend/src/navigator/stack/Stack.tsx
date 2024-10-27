import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackParamList } from './Stack.typeDefs';
import { DrawerProps } from '../drawer/Drawer.typeDefs';
import { StackHeaderTitle } from './components';
import { colors } from '@theme';
import MailButton from '@components/MailButton';

// views
import Map from '@views/Map';
import Bonfire from '@views/Bonfire';
import Book from '@views/Book';
import Camera from '@views/Camera';
import Friend from '@views/Friend';
import Success from '@views/Success';

const Stack = createNativeStackNavigator<StackParamList>();

const navigationProps = {
  headerTintColor: colors.white,
  headerStyle: { backgroundColor: colors.turquoise },
  headerTitleStyle: { fontSize: 18 },
};

export function MapStackNavigator({ navigation }: DrawerProps) {
  return (
    <Stack.Navigator screenOptions={navigationProps}>
      <Stack.Screen
        component={Map}
        name="MapStack"
        options={{
          title: 'Map',
          headerTitle: () => <StackHeaderTitle />,
          headerRight: () => <MailButton unread />,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        component={Camera}
        name="CameraStack"
        options={{
          title: 'Camera',
          headerTitle: () => <StackHeaderTitle />,
          headerRight: () => <MailButton unread />,
        }}
      />
      <Stack.Screen
        component={Friend}
        name="FriendStack"
        options={{
          title: 'Camera',
          headerTitle: () => <StackHeaderTitle />,
          headerLeft: () => <></>,
          headerRight: () => <MailButton unread />,
        }}
      />
      <Stack.Screen
        component={Success}
        name="SuccessStack"
        options={{
          title: 'Success',
          headerTitle: () => <StackHeaderTitle />,
          headerLeft: () => <></>,
          headerRight: () => <MailButton unread />,
        }}
      />
    </Stack.Navigator>
  );
}

export function BonfireStackNavigator({ navigation }: DrawerProps) {
  return (
    <Stack.Navigator screenOptions={navigationProps}>
      <Stack.Screen
        component={Bonfire}
        name="BonfireStack"
        options={{
          title: 'Bonfire',
          headerTitle: () => <StackHeaderTitle />,
          headerRight: () => <MailButton unread />,
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
}

export function BookStackNavigator({ navigation }: DrawerProps) {
  return (
    <Stack.Navigator screenOptions={navigationProps}>
      <Stack.Screen
        component={Book}
        name="BookStack"
        options={{
          title: 'Book',
          headerTitle: () => <StackHeaderTitle />,
          headerRight: () => <MailButton unread />,
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
}
