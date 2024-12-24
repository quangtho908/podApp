import { Stack } from "expo-router";

export default function MerchantLayout() {
  return (
    <Stack>
      <Stack.Screen name="createMerchant" options={{headerTitle: "Tạo cửa hàng"}} />
    </Stack>
  )
}