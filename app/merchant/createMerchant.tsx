import { postRequest } from "@/apis/common";
import cache from "@/service/cache";
import { AxiosResponse } from "axios";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

export default function MerchantSignupScreen() {
  const [name, setName] = useState("")
  const [address, setAddress] = useState("");
  const router = useRouter();
  const submitHandle = async () => {
    const response = await postRequest("merchants", {
      name,
      address
    })
    if(response.status !== 200) {
      return;
    }  
    const data = (response as AxiosResponse).data;
    cache.set("currentMerchant", data.merchantId)
    router.push('/(drawer)/(tabs)')
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