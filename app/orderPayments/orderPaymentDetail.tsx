import ResetOnPullToRefresh from "@/components/common/ResetOnPullRequest";
import CardProductPayment from "@/components/product/CardProductPayment";
import orderPaymentService from "@/service/orderPayments/orderPaymentStore";
import _ from "lodash";
import { StyleSheet, Image, ScrollView } from "react-native";

export default function OrderPaymentDetail() {
  const {currentOrderPayment} = orderPaymentService()
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ResetOnPullToRefresh contentContainerStyle={{gap: 15}}>
        {currentOrderPayment.order.products.map(product => <CardProductPayment {...product} key={product.id} />)}
      </ResetOnPullToRefresh>
      {!_.isEmpty(currentOrderPayment.image) && (
        <Image width={350} height={600} source={{uri: currentOrderPayment.image}}/>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
  }
})