import LeftSideDrawer from "@/components/drawer/LeftSideDrawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {Drawer} from "expo-router/drawer"
import { TouchableOpacity } from "react-native";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import useModalTable, { ModalTableType } from "@/components/table/services/modalTable";
import { useRouter } from "expo-router";
import { pictonBlue } from "@/constants/Pallete";

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
        drawerContent={(props: any) => (<LeftSideDrawer {...props} />)}
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
                <TabBarIcon name='add' color={pictonBlue[800]} />
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
                <TabBarIcon name='add' color={pictonBlue[800]} />
              </TouchableOpacity>
            )
          }}
        />
        <Drawer.Screen
          name="bankAccounts"
          options={{
            title: "Tài khoản ngân hàng",
            headerRight: () => (
              <TouchableOpacity
                onPress={() => router.push("/payments/addBankAccount")}
                style={{marginRight: 10}}
              >
                <TabBarIcon name="add" color={pictonBlue[800]} />
              </TouchableOpacity>
            )
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  )
}