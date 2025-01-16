import { Stack } from "expo-router";

export default function ChangePasswordLayout() {
  return (
    <Stack screenOptions={{headerTitleAlign: "center"}}>
      <Stack.Screen name="index" options={{title: "Thay đổi mật khẩu"}} />
    </Stack>
  )
}