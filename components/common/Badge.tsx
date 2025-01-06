import { red } from "@/constants/Pallete";
import color from "@/styles/color";
import { View, Text, StyleSheet } from "react-native";

type BadgeProps = {
  value: string
}

export default function Badge(props: BadgeProps) {
  return (
    <View style={styles.container}>
      <Text style={{...color.textWhite50, textAlign: "center"}}>{props.value}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: red[500],
    alignSelf: "center",
    justifyContent: "center",
    width: 25,
    height: 25,
    borderRadius: 50,
    position: "absolute",
    right: -15,
    top: -10
  }
})