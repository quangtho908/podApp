import LeftSideDrawer from "@/components/drawer/LeftSideDrawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {Drawer} from "expo-router/drawer"

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView>
      <Drawer 
        drawerContent={(props) => (<LeftSideDrawer {...props} />)}
        screenOptions={{headerShown: false}}
      >
        <Drawer.Screen 
          name="(tabs)"
        />
        <Drawer.Screen name="table" />
      </Drawer>
    </GestureHandlerRootView>
  )
}