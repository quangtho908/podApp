import { white } from "@/constants/Pallete";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function Spinner () {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: white[50],
    opacity: 0.5
  }
})