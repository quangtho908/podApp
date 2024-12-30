import { white } from "@/constants/Pallete";
import merchantService, { Merchant } from "@/service/merchant/merchantStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Image, StyleSheet, TouchableOpacity, Text } from "react-native";

export default function ChooseMerchantItem ({merchant}: {merchant: Merchant}) {
  const {setCurrentMerchant} = merchantService();
  const router = useRouter()

  const onPress = async () => {
    AsyncStorage.setItem("currentMerchant", merchant.id.toString())
    setCurrentMerchant(merchant.id)
    router.push("/(drawer)/(tabs)/home")
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