import LeftSideDrawer from "@/components/drawer/LeftSideDrawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {Drawer} from "expo-router/drawer"
import { TouchableOpacity } from "react-native";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useRouter } from "expo-router";
import { pictonBlue } from "@/constants/Pallete";
import authService from "@/service/auth/authStore";
import useModal from "@/service/modal/modal";
import useChooseImage from "@/service/chooseImage";

export default function DrawerLayout() {
  const {setVisible} = useModal()
  const router = useRouter();
  const {role} = authService()
  const {setFile} = useChooseImage()
  const onAddTable = () => {
    setVisible("create_table", true)
  }

  const onAddProduct = () => {
    setFile("")
    router.push("/products/addProduct")
  }

  return (
    <GestureHandlerRootView>
      <Drawer 
        drawerContent={(props: any) => (<LeftSideDrawer {...props} />)}
        screenOptions={{
          headerTitleAlign: "center"
        }}
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
            ),
            title: "Quản lý bàn"
          }}
        />
        <Drawer.Screen
          name="menu"
          options={{
            headerRight: () => (
              <TouchableOpacity
                style={{marginRight: 10}}
                onPress={onAddProduct}
              >
                <TabBarIcon name='add' color={pictonBlue[800]} />
              </TouchableOpacity>
            ),
            title: "Quản lý thực đơn"
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
        <Drawer.Screen
          name="employee"
          options={{
            title: "Quản lý nhân viên",
            headerRight: () => ( role === "OWNER" &&
              <TouchableOpacity
                onPress={() => router.push("/staff/invite")}
                style={{marginRight: 10}}
              >
                <TabBarIcon name="add" color={pictonBlue[800]} />
              </TouchableOpacity>
            )
          }}
        />
        <Drawer.Screen
          name="merchantSetting"
          options={{ title: "Cài đặt cửa hàng" }}
        />
        <Drawer.Screen
          name="userSetting"
          options={{
            title: "Cài đặt người dùng"
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  )
}