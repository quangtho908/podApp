import { pictonBlue, white } from "@/constants/Pallete";
import AsyncStorage from "@react-native-async-storage/async-storage"
import merchantService, { Merchant } from "@/service/merchant/merchantStore";
import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { registerForPushNotificationsAsync } from "@/utils/registerNotifications";
import { postRequest } from "@/apis/common";
import { useRouter } from "expo-router";
import useSpinner from "@/service/spinner";
import Toast from "react-native-toast-message";
import { AxiosResponse } from "axios";

export default function ItemStore({merchant}: {merchant: Merchant}) {
  const [choosed, setChoosed] = useState(false)
  const {currentMerchant, setCurrentMerchant} = merchantService();
  const {setVisible} = useSpinner()

  const router = useRouter();
  useEffect(() => {
    getMerchant()
  }, [currentMerchant])

  const getMerchant = async () => {
    setChoosed(currentMerchant !== null && currentMerchant === merchant.id)
  }

  const chooseMerchant = async () => {
    setVisible(true)
    await AsyncStorage.setItem("currentMerchant", merchant.id.toString())
    const token = await registerForPushNotificationsAsync()
    const response = await postRequest("users/setMerchant", {
      merchantId: merchant.id,
      expoToken: token
    })
    if(response.status === 401) {
      router.replace("/")
      setVisible(false)
      return;
    }else if(response.status !== 200) {
      setVisible(false)
      Toast.show({
        text1: "Đã xảy ra lỗi",
        text2: "Bạn bị xoá khỏi cửa hàng hoặc cửa hàng đã đóng",
        type: "error"
      })
      return
    }
    const data = (response as AxiosResponse).data
    await AsyncStorage.setItem("role", data.role)
    setVisible(false)
    setCurrentMerchant(merchant.id)
    router.replace("/(drawer)/(tabs)/home")
  }

  return (
    <TouchableOpacity onPress={chooseMerchant} style={{...styles.container, ...(choosed ? styles.active : {})}}>
      <Image source={require("@/assets/images/react-logo.png")} style={styles.image} />
      <Text style={styles.text}>{merchant.name}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    paddingVertical: 20,
    width: "100%",
    gap: 5
  },
  image: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: pictonBlue[500],
    borderRadius: 10,
  },
  text: {
    color: white[500],
    fontSize: 10
  },
  active: {
    borderRightWidth: 2,
    borderRightColor: pictonBlue[500],
    backgroundColor: pictonBlue[100],
  }
})