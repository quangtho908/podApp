import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Stack, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function PaymentLayout() {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen name="payment" options={{headerTitle: "Cài đặt mã PIN"}} />
      <Stack.Screen name="selectBank"
        options={{
          headerTitle: 'Quay lại',
          headerRight: () => (
          <TouchableOpacity onPress={() => router.push('/payments/pushchare')}>
            <TabBarIcon name='add' />
          </TouchableOpacity>
        )}}
      />
    </Stack>
  )
}