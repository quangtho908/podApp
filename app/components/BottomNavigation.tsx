import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HistoryStackScreen, HomeStackScreen } from '../common/navigatiors';
import CreateOrderButton from './CreateOrderButton';
import CreateOrderScreen from '../screens/createOrder';

const Tab = createBottomTabNavigator();

export default function BottomNavigation() {
  const colorScheme = useColorScheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}>
      <Tab.Screen name="HomeStack" component={HomeStackScreen} options={{
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

      <Tab.Screen name="Hisotry" component={HistoryStackScreen} options={{
        headerShown: false,
        tabBarIcon: ({focused}) => <TabBarIcon name={focused ? 'time' : 'time-outline'} />
      }}/>
    </Tab.Navigator>
  );
}
