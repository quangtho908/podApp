import { Link, router } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

export default function MerchantSignupScreen() {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thông tin cửa hàng</Text>

      <TextInput
        style={styles.input}
        placeholder="Tên cửa hàng"
      />

      <TextInput
        style={styles.input}
        placeholder="Địa chỉ cửa hàng"
      />

      <Button title="Next" onPress={() => router.push("/verifyMail/signup")} />
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