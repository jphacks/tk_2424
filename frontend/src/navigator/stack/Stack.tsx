import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackParamList } from './Stack.typeDefs';
import { DrawerProps } from '../drawer/Drawer.typeDefs';
import { StackHeaderLeft, StackHeaderTitle } from './components';
import { colors } from '@theme';
// import MailButton from '@components/MailButton';

// views
import Map from '@views/Map';
import Bonfire from '@views/Bonfire';
import Book from '@views/Book';
import Camera from '@views/Camera';
import Friend from '@views/Friend';

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
          headerLeft: () => <StackHeaderLeft onPress={() => navigation.toggleDrawer()} />,
          // headerRight: () => <MailButton unread />,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        component={Camera}
        name="CameraStack"
        options={{
          title: 'Camera',
          headerTitle: () => <StackHeaderTitle />,
        }}
      />
      <Stack.Screen
        component={Friend}
        name="FriendStack"
        options={{
          title: 'Camera',
          headerTitle: () => <StackHeaderTitle />,
          headerLeft: () => <></>,
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
          headerLeft: () => <StackHeaderLeft onPress={() => navigation.toggleDrawer()} />,
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
          headerLeft: () => <StackHeaderLeft onPress={() => navigation.toggleDrawer()} />,
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
}
