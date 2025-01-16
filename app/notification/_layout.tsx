import { Stack } from "expo-router";

export default function NotificationLayout () {
  return (
    <Stack screenOptions={{headerTitleAlign: "center"}}>
      <Stack.Screen name="index" options={{title: "Thông báo"}} />
    </Stack>
  )
}