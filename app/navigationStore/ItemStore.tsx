import { Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { pictonBlue, white } from "../common/colors";

export default function ItemStore() {
  return (
    <TouchableOpacity style={{...styles.container, ...styles.active}}>
      <Image source={require("@/assets/images/react-logo.png")} style={styles.image} />
      <Text style={styles.text}>Store 1</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    paddingVertical: 10,
    width: "100%",
    gap: 5
  },
  image: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: pictonBlue[500],
    borderRadius: 10,
  },
  text: {
    color: white[500],
    fontSize: 10
  },
  active: {
    borderRightWidth: 2,
    borderRightColor: pictonBlue[500],
    backgroundColor: pictonBlue[100],
  }
})