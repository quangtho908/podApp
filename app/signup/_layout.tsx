import { Stack } from "expo-router";

export default function LayoutSignup() {
  return (
    <Stack screenOptions={{
      headerTitle: "Đăng ký tài khoản"
    }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="verifyMail" />
      <Stack.Screen name="setPassword" />
    </Stack>
  );
}