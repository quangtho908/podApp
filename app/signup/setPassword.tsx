import { postRequest } from "@/apis/common";
import PasswordField from "@/components/PasswordField";
import signupService from "@/service/auth/signup";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { AxiosError, AxiosResponse } from "axios";
import { router } from "expo-router";
import * as _ from "lodash";
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView } from "react-native";

export default function SetPasswordScreen() {
  const [password, setPassword] = useState("")
  const [verifyPassword, setVerifyPassword] = useState("")
  const [disabledNext, setDisabledNext] = useState(true)
  const {signup, setSignup} = signupService()
  const compareVerfiy = (newPass: string) => {
    setPassword(newPass)
    setDisabledNext(_.isEmpty(newPass) || _.isEmpty(verifyPassword) ||  newPass !== verifyPassword)
  }

  const comparePassword = (newPass: string) => {
    setVerifyPassword(newPass)
    setDisabledNext(_.isEmpty(newPass) || _.isEmpty(password) ||  newPass !== password)
  }

  const signupHandle = async () => {
    signup.password = password;
    setSignup(signup)
    const response = await postRequest("auth/u/signup", signup)
    console.log(response)

    if(response.status === 200) {
      AsyncStorage.setItem("token", (response as AxiosResponse).data.token);
      router.push("/pin/setup")
      return
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Thiết lập mật khẩu</Text>
      <PasswordField placeholder="Mật khẩu của bạn" onChangeText={compareVerfiy} />
      <PasswordField placeholder="Nhập lại mật khẩu" onChangeText={comparePassword} />
      <Button title="Next" onPress={signupHandle} disabled={disabledNext}/>
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