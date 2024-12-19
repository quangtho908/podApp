import { white } from "@/constants/Pallete";
import React, { Ref } from "react";
import { View, Text, TextInput, StyleSheet, TextInputProps } from "react-native";

export default function Input(props: TextInputProps & {label?: string}) {
  return (
    <View style={{gap: 10}}>
      <Text>{props.label}</Text>
      <TextInput style={styles.input} {...props} />
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: white[400]
  }
})