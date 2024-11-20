import PasswordField from "@/components/PasswordField";
import { router } from "expo-router";
import React from "react";
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView } from "react-native";

export default function SetPasswordScreen() {

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Thiết lập mật khẩu</Text>

      <PasswordField placeholder="Mật khẩu của bạn" />
      <PasswordField placeholder="Nhập lại mật khẩu" />

      <Button title="Next" onPress={() => router.push("/pin/setup")}/>
    </SafeAreaView>
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