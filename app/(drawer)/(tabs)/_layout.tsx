import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CreateOrderScreen from './createOrder';
import CreateOrderButton from '@/components/CreateOrderButton';
import { HomeLayout } from './(home)/_layout';
import { HistoryLayout } from './(history)/_layout';
import { useNavigation } from 'expo-router';
const Tab = createBottomTabNavigator();

export default function BottomNavigation() {
  const colorScheme = useColorScheme();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}>
      <Tab.Screen name="HomeStack" component={HomeLayout} options={{
        headerShown: false,
        tabBarIcon: ({focused}) => <TabBarIcon name={focused ? 'home' : 'home-outline'} />
      }}/>

      <Tab.Screen 
        name='createOrder' 
        component={CreateOrderScreen} 
        options={({ navigation }) => ({
          tabBarButton: () => <CreateOrderButton onPress={() => navigation.navigate("CreateOrder")} />
        })}
      />

      <Tab.Screen name="Hisotry" component={HistoryLayout} options={{
        headerShown: false,
        tabBarIcon: ({focused}) => <TabBarIcon name={focused ? 'time' : 'time-outline'} />
      }}/>
    </Tab.Navigator>
  );
}
