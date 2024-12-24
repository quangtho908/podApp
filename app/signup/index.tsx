import signupService from "@/service/auth/signup";
import { Link, router, useNavigation } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

export default function UserSignUpScreen() {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const {signup, setSignup} = signupService()
  const handleNext = () => {
    signup.phoneNumber = phone
    signup.email = email
    signup.fullName = fullName
    setSignup(signup);
    router.push("/signup/setPassword")
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thông tin người dùng</Text>

      <TextInput
        style={styles.input}
        placeholder="Số điện thoại"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Họ và tên"
        value={fullName}
        onChangeText={setFullName}
      />
      <Button title="Next" onPress={handleNext}/>
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