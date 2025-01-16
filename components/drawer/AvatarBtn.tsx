import { StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import Popover from "react-native-popover-view";
import { TabBarIcon } from "../navigation/TabBarIcon";
import { pictonBlue, white } from "@/constants/Pallete";
import { Placement } from "react-native-popover-view/dist/Types";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useRouter } from "expo-router";
import { postRequest } from "@/apis/common";
import _ from "lodash";
import Toast from "react-native-toast-message";
import userService from "@/service/user/userStore";

export function AvatarBtn() {
  const [popoverVisible, setPopoverVisible] = useState(false);
  const router = useRouter()
  const {user} = userService()
  const logout = async () => {
    const refreshToken = await AsyncStorage.getItem("refreshToken")
    if(_.isEmpty(refreshToken)) {
      await AsyncStorage.clear()
      setPopoverVisible(false)
      router.replace("/")
      return
    }
    const response = await postRequest("auth/logout", {
      refreshToken
    })
    if(response.status === 401) {
      router.replace("/")
      return
    }else if(response.status !== 200) {
      Toast.show({
        type: "error",
        text1: "Xảy ra lỗi"
      })
      return;
    }
    await AsyncStorage.clear()
    setPopoverVisible(false)
    router.replace("/")
  }

  const routeToSetting = () => {
    setPopoverVisible(false)
    router.push("/(drawer)/userSetting")
  }

  return (
      <Popover
        placement={Placement.TOP}
        isVisible={popoverVisible}
        onRequestClose={() => setPopoverVisible(false)}
        from={(
          <TouchableOpacity style={styles.action} onPress={() => setPopoverVisible(true)}>
            {
              _.isEmpty(user.avatar) ?
              <TabBarIcon name="image" color={white[50]} style={{margin: 10}} /> :
              <Image source={{uri: user.avatar}} style={styles.image} />
            }
            
          </TouchableOpacity>
        )}
      >
        <TouchableOpacity style={styles.btn} onPress={routeToSetting}>
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
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 50
  }
})