import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import SwitchBtn from "../SwitchBtn";

export default function OrderTypeBtn() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tại bàn</Text>
      <SwitchBtn isEnabled={isEnabled} toggleSwitch={toggleSwitch} />
      <Text style={styles.label}>Mang đi</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  label: {
    fontSize: 16,
    fontWeight: '500'
  }
})