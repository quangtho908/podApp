import orderPaymentService from "@/service/orderPayments/orderPaymentStore";
import { Stack } from "expo-router";

export default function OrderPaymentLayout () {
  const {currentOrderPayment} = orderPaymentService()
  return (
    <Stack screenOptions={{headerTitleAlign: "center"}}>
      <Stack.Screen name="orderPaymentDetail" options={{title: `Đơn hàng ${currentOrderPayment.order.id}`}} />
    </Stack>
  )
}