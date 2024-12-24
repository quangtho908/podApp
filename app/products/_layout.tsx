import { Stack } from "expo-router";

export default function ProductsLayout() {
  return (
    <Stack>
      <Stack.Screen name="addProduct" options={{headerTitle: "Cài đặt mã PIN"}} />
      <Stack.Screen name="updateProduct" options={{headerTitle: "Nhập mã PIN"}} />
    </Stack>
  )
}