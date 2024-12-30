import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Popover from "react-native-popover-view";
import { TabBarIcon } from "../navigation/TabBarIcon";
import { pictonBlue, white } from "@/constants/Pallete";
import { Placement } from "react-native-popover-view/dist/Types";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useRouter } from "expo-router";

export function AvatarBtn() {
  const [popoverVisible, setPopoverVisible] = useState(false);
  const router = useRouter()
  const logout = async () => {
    await AsyncStorage.clear()
    setPopoverVisible(false)
    router.replace("/")
  }

  return (
      <Popover
        placement={Placement.TOP}
        isVisible={popoverVisible}
        onRequestClose={() => setPopoverVisible(false)}
        from={(
          <TouchableOpacity style={styles.action} onPress={() => setPopoverVisible(true)}>
            <TabBarIcon name="image" color={white[50]} />
          </TouchableOpacity>
        )}
      >
        <TouchableOpacity style={styles.btn}>
          <TabBarIcon name="settings" color={white[500]} />
          <Text>Cài đặt</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={logout}>
          <TabBarIcon name="log-out" color={white[500]} />
          <Text>Đăng xuất</Text>
        </TouchableOpacity>
      </Popover>
  )
}

const styles = StyleSheet.create({
  action: {
    padding: 10,
    backgroundColor: pictonBlue[800],
    borderRadius: 50,
    width: 50,
    height: 50,
    margin: "auto",
    marginBottom: 20
  },
  btn: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  }
})