import { postRequest } from "@/apis/common";
import PasswordField from "@/components/common/PasswordField";
import PrimaryButton from "@/components/common/PrimaryButton";
import { pictonBlue, white } from "@/constants/Pallete";
import { AxiosResponse } from "axios";
import { router } from "expo-router";
import * as _ from "lodash";
import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Toast from "react-native-toast-message";
import verifyService from "@/service/auth/verifyStore";

export default function LoginScreen() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("");
  const {setVerify} = verifyService()
  useEffect(() => {
    checkLogin()
  }, [])

  const checkLogin = async () => {
    const token = await AsyncStorage.getItem("token")
    if((_.isEmpty(token))) {
      await AsyncStorage.clear();
      return
    }
    const active = await AsyncStorage.getItem("active")
    if(_.isEmpty(active)) {
      await postRequest("users/reqVerify", {verifyAction: "activeAccount"})
      setVerify("activeAccount")
      router.push("/signup/verifyMail")
      return;
    }
    const pin = await AsyncStorage.getItem("pin")
    if(!pin) {
      router.replace("/pin/setup")
      return
    }
    const isVerifyPin = await AsyncStorage.getItem("verify_pin");
    if(_.isEmpty(isVerifyPin)) {
      router.replace("/pin/input")
      return;
    }
    router.replace("/merchant/chooseMerchant")
  }

  const handleSubmit = async () => {
    const response = await postRequest("auth/u/login", {
      phoneNumber: username,
      password
    })
    if(response.status !== 200) {
      Toast.show({
        type: "error",
        text1: "Lỗi đăng nhập",
        text2: "Số điện thoại hoặc mật khẩu sai"
      })
      return
    }
    const data = (response as AxiosResponse).data;
    await AsyncStorage.setItem("token", data.token)
    await AsyncStorage.setItem("refreshToken", data.refreshToken)
    await AsyncStorage.setItem("active", data.active ? "ok" : "");
    const active = await AsyncStorage.getItem("active")
    if(_.isEmpty(active)) {
      await postRequest("users/reqVerify", {verifyAction: "activeAccount"})
      setVerify("activeAccount")
      router.push("/signup/verifyMail")
      return;
    }
    const pin = await AsyncStorage.getItem("pin")
    if(!pin) {
      router.push("/pin/setup")
      return
    }
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
        onChangeText={(newText) => setUsername(newText)}
      />

      <PasswordField placeholder="Mật khẩu" onChangeText={(newText) => setPassword(newText)} />
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