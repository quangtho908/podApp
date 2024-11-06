import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "../screens/home";
import CreateOrderScreen from "../screens/createOrder";
import HistoryScreen from "../screens/history";
import HeaderButton from "../components/HeaderButton";

const HomeStack = createNativeStackNavigator();

export function HomeStackScreen({navigation}: {navigation: any}) {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          title: "",
          headerLeft: () => <HeaderButton onPress={() => navigation.openDrawer()} />
        }}
      />
      <HomeStack.Screen name="CreateOrder" component={CreateOrderScreen} />
    </HomeStack.Navigator>
  )
}

const HistoryStack = createNativeStackNavigator();

export function HistoryStackScreen({navigation}: {navigation: any}) {
  return (
    <HistoryStack.Navigator>
      <HistoryStack.Screen
        name="History"
        component={HistoryScreen}
        options={{
          title: "",
          headerLeft: () => <HeaderButton onPress={() => navigation.openDrawer()} />
        }}
      />
      <HistoryStack.Screen name="CreateOrder" component={CreateOrderScreen} />
    </HistoryStack.Navigator>
  )
}