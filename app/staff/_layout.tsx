import { Stack } from "expo-router";

export default function StaffLayout() {
  return (
    <Stack screenOptions={{headerTitleAlign: "center"}}>
      <Stack.Screen name="invite" options={{title: "Thêm nhân viên mới"}} />
    </Stack>
  )
}