import { View, Text, StyleSheet } from "react-native";

export default function CreateOrderScreen() {
  return(
    <View style={styles.container}>
      <Text>Create Order</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  }
})