import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '@theme';
import { TabParamList } from './Tab.typeDefs';
import { MapStackNavigator, BonfireStackNavigator, BookStackNavigator } from '../stack/Stack';
import { View } from 'react-native';
import { StackProps } from '@navigator/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const Tab = createBottomTabNavigator<TabParamList>();

const renderTabBarIcon =
  (tabName: keyof TabParamList) =>
  ({ focused }: { focused: boolean }) => {
    const size = focused ? 42 : 32;
    const backgroundColor = focused ? colors.lightGreen : 'transparent'; // アクティブなら背景色を設定、非アクティブなら透明
    const iconStyle = {
      marginTop: focused ? -15 : 0, // アクティブなタブでアイコンを上に移動
    };
    return (
      <View
        style={{
          width: 100, // 背景のビューのサイズを設定
          height: 80,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 50,
          backgroundColor,
        }}>
        <MaterialCommunityIcons
          name={
            tabName === 'MapTab' ? 'map-marker' : tabName === 'BonfireTab' ? 'campfire' : 'book'
          }
          size={size}
          color={focused ? colors.black : colors.gray}
          style={iconStyle}
        />
      </View>
    );
  };
export default function TabNavigator({ navigation }: StackProps) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: renderTabBarIcon(route.name),
        headerShown: false,
        tabBarInactiveTintColor: colors.gray,
        tabBarInactiveBackgroundColor: colors.turquoise,
        tabBarActiveTintColor: colors.black,
        tabBarActiveBackgroundColor: colors.turquoise,
        tabBarStyle: {
          height: 60, // タブの高さ
          paddingBottom: 0,
          display:
            getFocusedRouteNameFromRoute(route) === 'FriendStack'
              ? // getFocusedRouteNameFromRoute(route) === 'BattleStack'
                'none'
              : 'flex',
        },
        tabBarLabelStyle: {
          marginBottom: 4, // 文字の位置
        },
      })}>
      <Tab.Screen
        name="MapTab"
        component={MapStackNavigator as React.ComponentType<any>}
        options={{ title: 'ゴミMAP' }}
      />
      <Tab.Screen
        name="BonfireTab"
        component={BonfireStackNavigator as React.ComponentType<any>}
        options={{ title: '焚き火' }}
      />
      <Tab.Screen
        name="BookTab"
        component={BookStackNavigator as React.ComponentType<any>}
        options={{ title: 'ゴミンゴ図鑑' }}
      />
    </Tab.Navigator>
  );
}
