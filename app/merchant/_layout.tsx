import { Stack } from "expo-router";

export default function MerchantLayout() {
  return (
    <Stack screenOptions={{headerTitleAlign: "center"}}>
      <Stack.Screen name="createMerchant" options={{headerTitle: "Tạo cửa hàng"}} />
      <Stack.Screen name="chooseMerchant" options={{headerTitle: "Tạo cửa hàng"}} />
    </Stack>
  )
}