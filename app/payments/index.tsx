import BottomBarPayment from "@/components/payment/BottomBarPayment";
import ModalConfirmPayment from "@/components/payment/ModalConfirmPayment";
import CardProductPayment from "@/components/product/CardProductPayment";
import ResetOnPullToRefresh from "@/components/ResetOnPullRequest";
import orderService from "@/service/orders/orderStore";
import { StyleSheet, View } from "react-native";

export default function Payment() {
  const {currentOrder} = orderService();

  return (
    <View style={styles.container}>
      <ResetOnPullToRefresh contentContainerStyle={{gap: 15, padding: 20, paddingBottom: 230}}>
        {currentOrder.products.map(product => <CardProductPayment {...product} key={product.id} />)}
      </ResetOnPullToRefresh>
      <BottomBarPayment/>
      <ModalConfirmPayment/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})