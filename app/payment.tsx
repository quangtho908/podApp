import BottomBarPayment from "@/components/payment/BottomBarPayment";
import ModalConfirmPayment from "@/components/payment/ModalConfirmPayment";
import CardProductPayment from "@/components/product/CardProductPayment";
import ResetOnPullToRefresh from "@/components/ResetOnPullRequest";
import { StyleSheet, View } from "react-native";

export default function Payment() {

  return (
    <View style={styles.container}>
      <ResetOnPullToRefresh contentContainerStyle={{gap: 15, padding: 20, paddingBottom: 230}}>
        <CardProductPayment />
        <CardProductPayment />
        <CardProductPayment />
        <CardProductPayment />
        <CardProductPayment />
        <CardProductPayment />
        <CardProductPayment />
        <CardProductPayment />
        <CardProductPayment />
        <CardProductPayment />
        <CardProductPayment />
        <CardProductPayment />
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