import { Stack } from "expo-router";

export default function LayoutSignup() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{title: "Đăng ký tài khoản"}} />
      <Stack.Screen name="verifyMail" options={{title: "Xác minh email"}} />
      <Stack.Screen name="setPassword" />
    </Stack>
  );
}