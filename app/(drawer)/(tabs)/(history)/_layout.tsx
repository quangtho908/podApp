import HeaderButton from "@/components/HeaderButton";
import HistoryScreen from ".";
import CreateOrderScreen from "../createOrder";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const HistoryStack = createNativeStackNavigator();

export function HistoryLayout({navigation}: {navigation: any}) {
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