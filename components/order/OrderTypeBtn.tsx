import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import SwitchBtn from "../SwitchBtn";
import setOrderService from "@/service/orders/setOrder";

export default function OrderTypeBtn() {
  const [isEnabled, setIsEnabled] = useState(false);
  const {order, updateCurrentTable, currentTable, isTakeOut} = setOrderService();

  useEffect(() => {
    if(order.tableId > 0) {
      setIsEnabled(false)
    }
  }, [currentTable])

  const toggleSwitch = () => {
    setIsEnabled(!isEnabled)
    if(!isEnabled) {
      updateCurrentTable(null)
    }else {
      isTakeOut(false)
    }
  };
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