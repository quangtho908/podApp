import { white } from "@/constants/Pallete";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";

export default function PasswordField(props: TextInputProps) {
  const [showPassword, setShowPassword] = useState(true)

  function toggleShowPassword() {
    setShowPassword(!showPassword)
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={props.placeholder}
        onChange={props.onChange}
        secureTextEntry={showPassword}
      />
      <MaterialCommunityIcons
        name={showPassword ? 'eye-off' : 'eye'}
        size={24}
        color="#aaa"
        style={styles.icon}
        onPress={toggleShowPassword}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: white[50],
    borderColor: white[300],
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10
  },
  input: {
    flex: 1,
    height: 40,
    paddingLeft: 10,
  },
  icon: {
    marginRight: 10
  }
});