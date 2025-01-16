import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Tabs, useNavigation } from 'expo-router';
import HeaderButton from '@/components/HeaderButton';
import { NavigationProp } from '@react-navigation/native';
import NotificationBtn from '@/components/notifications/NotificationBtn';

export default function BottomNavigation() {
  const colorScheme = useColorScheme();
  const navigation: NavigationProp<ReactNavigation.RootParamList> & {openDrawer: () => void} = useNavigation();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerLeft: () => <HeaderButton onPress={() => navigation.openDrawer()} />,
        headerTitleAlign: "center"
      }}>
      <Tabs.Screen name="home" options={{
        headerTitle: 'IPOD',
        title: 'Danh sách đơn',
        tabBarIcon: ({focused}) => <TabBarIcon name={focused ? 'home' : 'home-outline'} />,
        headerRight: () => <NotificationBtn />
      }}/>

      <Tabs.Screen name='history' options={{
        title: 'Lịch sử đơn',
        tabBarIcon: ({focused}) => <TabBarIcon name={focused ? 'time' : 'time-outline'} />
      }}/>
    </Tabs>
  );
}
