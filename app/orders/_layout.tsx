import CancelCreateOrderBtn from "@/components/order/CancelCreateOrderBtn";
import { Stack } from "expo-router";

export default function OrdersLayout() {
  return (
    <Stack>
      <Stack.Screen name="createOrder"  options={{
            headerLeft: () => <CancelCreateOrderBtn />,
            title: "Tạo đơn hàng",
            headerTitleAlign: "center"
          }} />
    </Stack>
  )
}