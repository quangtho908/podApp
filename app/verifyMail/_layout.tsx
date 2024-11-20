import { Stack } from "expo-router";

export default function VerifyMailLayout() {
  return (
    <Stack screenOptions={{headerTitle: "Xác thực Email"}}>
      <Stack.Screen name="[action]" />
    </Stack>
  )
}