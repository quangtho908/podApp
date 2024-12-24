import LeftSideDrawer from "@/components/drawer/LeftSideDrawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {Drawer} from "expo-router/drawer"
import { TouchableOpacity } from "react-native";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import useModalTable, { ModalTableType } from "@/components/table/services/modalTable";
import { useRouter } from "expo-router";

export default function DrawerLayout() {
  const {setProps, modals} = useModalTable()
  const modalCreateTable: any = modals.get(ModalTableType.Create);
  const router = useRouter();
  const onAddTable = () => {
    setProps(ModalTableType.Create, {
      ...modalCreateTable,
      visible: true
    })
  }

  return (
    <GestureHandlerRootView>
      <Drawer 
        drawerContent={(props) => (<LeftSideDrawer {...props} />)}
      >
        <Drawer.Screen 
          name="(tabs)"
          options={{headerShown: false}}
        />
        <Drawer.Screen
          name="table"
          options={{
            headerRight: () => (
              <TouchableOpacity
                style={{marginRight: 10}}
                onPress={onAddTable}
              >
                <TabBarIcon name='add' />
              </TouchableOpacity>
            )
          }}
        />
        <Drawer.Screen
          name="menu"
          options={{
            headerRight: () => (
              <TouchableOpacity
                style={{marginRight: 10}}
                onPress={() => router.push("/products/addProduct")}
              >
                <TabBarIcon name='add' />
              </TouchableOpacity>
            )
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  )
}