import { Stack } from "expo-router";

export default function PINLayout() {
  return (
    <Stack>
      <Stack.Screen name="setup" options={{headerTitle: "Cài đặt mã PIN"}} />
      <Stack.Screen name="input" options={{headerTitle: "Nhập mã PIN"}} />
    </Stack>
  )
}