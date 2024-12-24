import { pictonBlue, white } from "@/constants/Pallete";
import cache from "@/service/cache";
import merchantService, { Merchant } from "@/service/merchant/merchantStore";
import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function ItemStore({merchant}: {merchant: Merchant}) {
  const [choosed, setChoosed] = useState(false)
  const {currentMerchant, setCurrentMerchant} = merchantService();
  useEffect(() => {
    getMerchant()
  }, [currentMerchant])

  const getMerchant = async () => {
    setChoosed(currentMerchant !== null && currentMerchant === merchant.id)
  }

  const chooseMerchant = () => {
    cache.set("currentMerchant", merchant.id.toString())
    setCurrentMerchant(merchant.id)
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
    paddingVertical: 10,
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