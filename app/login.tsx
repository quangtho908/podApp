import { pictonBlue, white } from "@/constants/Pallete";
import React from "react"
import { View, Text, StyleSheet, TextInput, Touchable, TouchableOpacity } from "react-native"

export default function LoginScreen() {
  // input username
  // input password
  // button login
  // link signup
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor={pictonBlue[400]}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={pictonBlue[400]}
        secureTextEntry={true} //Hidden password
      />

      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>
          You don't have an account?{" "}
        </Text>
        <TouchableOpacity>
          <Text style={styles.signupLink}>Signup Now</Text>
        </TouchableOpacity>
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
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: pictonBlue[700]
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
    color: pictonBlue[900],
  },
  loginButton: {
    backgroundColor: pictonBlue[500],
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  loginButtonText: {
    color: white[50],
    fontSize: 18,
    fontWeight: "bold",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signupText: {
    fontSize: 16,
    color: pictonBlue[800],
  },
  signupLink: {
    fontSize: 16,
    color: pictonBlue[500],
    fontWeight: "bold",
  },
});