import { pictonBlue, white } from "@/constants/Pallete";
import AsyncStorage from "@react-native-async-storage/async-storage"
import merchantService, { Merchant } from "@/service/merchant/merchantStore";
import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { TabBarIcon } from "../navigation/TabBarIcon";
import { useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";

export default function AddStoreBtn() {
  const router = useRouter();

  const chooseMerchant = () => {
    router.push("/merchant/createMerchant")
  }

  return (
    <TouchableOpacity onPress={chooseMerchant} style={styles.container}>
      <TabBarIcon name="add" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    paddingVertical: 30,
    width: "100%",
    gap: 5,
    backgroundColor: pictonBlue[100],
    marginBottom: 5
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