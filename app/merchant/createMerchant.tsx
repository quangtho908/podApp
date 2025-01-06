import { postRequest } from "@/apis/common";
import { AxiosResponse } from "axios";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"
import merchantService from "@/service/merchant/merchantStore";

export default function MerchantSignupScreen() {
  const [name, setName] = useState("")
  const [address, setAddress] = useState("");
  const {setCurrentMerchant} = merchantService()
  const router = useRouter();
  const submitHandle = async () => {
    const response = await postRequest("merchants", {
      name,
      address
    })
    if(response.status === 200) {
      const data = (response as AxiosResponse).data;
      AsyncStorage.setItem("currentMerchant", data.merchantId.toString())
      setCurrentMerchant(data.merchantId)
      router.replace('/(drawer)/(tabs)/home')
      return
    }else if(response.status === 401) {
      router.replace("/")
      return
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thông tin cửa hàng</Text>

      <TextInput
        style={styles.input}
        placeholder="Tên cửa hàng"
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Địa chỉ cửa hàng"
        onChangeText={setAddress}
      />

      <Button title="Next" onPress={submitHandle} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
  },
});