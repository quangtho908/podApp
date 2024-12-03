import CardProductOrder from "@/components/product/CardProductOrder";
import ModalOrder from "@/components/order/ModalOrder";
import ResetOnPullToRefresh from "@/components/ResetOnPullRequest";
import { View, StyleSheet } from "react-native";

export default function CreateOrderScreen() {
  return(
    <View style={{flex: 1}}>
      <ResetOnPullToRefresh contentContainerStyle={styles.container}>
        <CardProductOrder amount={0} />
        <CardProductOrder amount={0} />
        <CardProductOrder amount={0} />
        <CardProductOrder amount={0} />
      </ResetOnPullToRefresh>
      <ModalOrder />
    </View>
    
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
    paddingBottom: 150
  }
})