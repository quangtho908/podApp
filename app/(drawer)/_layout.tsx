import { createDrawerNavigator } from "@react-navigation/drawer"
import BottomNavigation from "../components/BottomNavigation";
import { NavigationContainer } from "@react-navigation/native";
import LeftSideDrawer from "../components/LeftSideDrawer";

const Drawer = createDrawerNavigator();

export default function DrawerLayout() {
  return (
    <NavigationContainer independent={true} >
      <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => (<LeftSideDrawer {...props} />)} screenOptions={{headerShown: false}}>
        <Drawer.Screen 
          name="Home" 
          component={BottomNavigation} 
          options={{
            headerShown: false
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}