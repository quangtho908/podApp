import { pictonBlue, white } from "@/constants/Pallete";
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

export default function PrimaryButton({title, ...props}: TouchableOpacityProps & {title: string}) {
  return (
    <TouchableOpacity style={styles.button} {...props} >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: pictonBlue[500],
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: white[50],
    fontSize: 18,
    fontWeight: "bold",
  },
})