import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Tabs, useNavigation } from 'expo-router';
import HeaderButton from '@/components/HeaderButton';
import { NavigationProp } from '@react-navigation/native';

export default function BottomNavigation() {
  const colorScheme = useColorScheme();
  const navigation: NavigationProp<ReactNavigation.RootParamList> & {openDrawer: () => void} = useNavigation('../../(drawer)');
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerLeft: () => <HeaderButton onPress={() => navigation.openDrawer()} />,
      }}>
      <Tabs.Screen name="index" options={{
        headerTitle: '',
        title: 'Danh sách đơn',
        tabBarIcon: ({focused}) => <TabBarIcon name={focused ? 'home' : 'home-outline'} />,
      }}/>

      <Tabs.Screen name='history' options={{
        headerTitle: '',
        title: 'Lịch sử đơn',
        tabBarIcon: ({focused}) => <TabBarIcon name={focused ? 'time' : 'time-outline'} />
      }}/>
    </Tabs>
  );
}
