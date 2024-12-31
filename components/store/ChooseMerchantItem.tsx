import { postRequest } from "@/apis/common";
import { white } from "@/constants/Pallete";
import merchantService, { Merchant } from "@/service/merchant/merchantStore";
import useSpinner from "@/service/spinner";
import { registerForPushNotificationsAsync } from "@/utils/registerNotifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import Toast from "react-native-toast-message";

export default function ChooseMerchantItem ({merchant}: {merchant: Merchant}) {
  const {setCurrentMerchant, currentMerchant} = merchantService();
  const {setVisible} = useSpinner()
  const router = useRouter()

  const onPress = async () => {
    setVisible(true)
    await AsyncStorage.setItem("currentMerchant", merchant.id.toString())
    setCurrentMerchant(merchant.id)
    const token = await registerForPushNotificationsAsync()
    const response = await postRequest("users/setMerchant", {
      merchantId: currentMerchant,
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
    setVisible(false)
    router.replace("/(drawer)/(tabs)/home")
  }
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={require("@/assets/images/react-logo.png")} style={styles.image}/>
      <Text>{merchant.name}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    backgroundColor: white[50],
    borderRadius: 10,
    shadowColor: white[800],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
    padding: 10
  },
  image: {
    width: 50,
    height: 50
  }
})