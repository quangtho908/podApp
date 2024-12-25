import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import bankAccountService from "@/service/bankAccounts/bankAccountsStore";
import orderService from "@/service/orders/orderStore";
import bankService from "@/service/vietQr/bankService";
import color from "@/styles/color";
import styleText from "@/styles/text";
import { Stack, useRouter } from "expo-router";
import { TouchableOpacity, Text } from "react-native";

export default function PaymentLayout() {
  const router = useRouter();
  const {resetCurrentBank} = bankService()
  const {resetCurrentBankAccount} = bankAccountService()
  const {resetCurrentOrder} = orderService()
  const cancelPayment = () => {
    resetCurrentBankAccount()
    resetCurrentOrder()
    router.back()
  }
  const cancelAddBankAccount = () => {
    resetCurrentBank()
    router.back()
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Thanh toán đơn hàng",
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity onPress={cancelPayment}>
              <Text style={{...color.textBlue500, ...styleText.text}}>Huỷ</Text>
            </TouchableOpacity>
          )
        }}
      />
      <Stack.Screen name="selectBank"
        options={{
          headerTitle: 'Quay lại',
          headerRight: () => (
          <TouchableOpacity onPress={() => router.push('/payments')}>
            <TabBarIcon name='add' />
          </TouchableOpacity>
        )}}
      />
      <Stack.Screen
        name="bankAccounts"
        options={{
          title: "Tài khoản ngân hàng",
          headerRight: () => (
            <TouchableOpacity onPress={() => router.push("/payments/addBankAccount")}>
              <TabBarIcon name="add" />
            </TouchableOpacity>
          )
        }}
      />
      <Stack.Screen name="addBankAccount" options={{
        title: "thêm ngân hàng mới",
        headerTitleAlign: "center",
        headerLeft: () => (
          <TouchableOpacity onPress={cancelAddBankAccount}>
            <Text style={{...color.textBlue500, ...styleText.text}}>Huỷ</Text>
          </TouchableOpacity>
        )
      }} />
    </Stack>
  )
}