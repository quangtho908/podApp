import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from ".";
import HeaderButton from "@/components/HeaderButton";
import CreateOrderScreen from "../createOrder";

const HomeStack = createNativeStackNavigator();

export function HomeLayout({navigation}: {navigation: any}) {
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