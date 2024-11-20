import PasswordField from "@/components/PasswordField";
import PrimaryButton from "@/components/PrimaryButton";
import { pictonBlue, white } from "@/constants/Pallete";
import { router } from "expo-router";
import React from "react"
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native"

export default function LoginScreen() {
  
  const handleSubmit = () => {
    router.push("/pin/input")
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>
          Bạn chưa có tài khoản?{" "}
        </Text>
        <Pressable onPress={() => router.push('/signup')}>
          <Text style={styles.signupLink}>Đăng ký</Text>
        </Pressable>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Email hoặc số điện thoại"
        placeholderTextColor={white[400]}
      />

      <PasswordField placeholder="Mật khẩu" />
      <PrimaryButton title="Đăng nhập" onPress={handleSubmit} />
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>
          Bạn quên mật khẩu?{" "}
        </Text>
        <Pressable onPress={() => router.push('/signup')}>
          <Text style={styles.signupLink}>Quên mật khẩu</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: white[50],
    gap: 15
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: white[300],
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signupText: {
    fontSize: 16,
    color: white[900],
  },
  signupLink: {
    fontSize: 16,
    color: pictonBlue[500],
    fontWeight: "bold",
  },
});