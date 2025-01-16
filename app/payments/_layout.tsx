import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import bankAccountService from "@/service/bankAccounts/bankAccountsStore";
import orderService from "@/service/orders/orderStore";
import bankService from "@/service/banks/bankService";
import color from "@/styles/color";
import styleText from "@/styles/text";
import { Stack, useRouter } from "expo-router";
import { TouchableOpacity, Text } from "react-native";
import { pictonBlue } from "@/constants/Pallete";

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
    <Stack screenOptions={{headerTitleAlign: "center"}}>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Thanh toán đơn hàng",
          headerLeft: () => (
            <TouchableOpacity onPress={cancelPayment}>
              <Text style={{...color.textBlue500, ...styleText.text}}>Huỷ</Text>
            </TouchableOpacity>
          )
        }}
      />
      <Stack.Screen name="selectBank"
        options={{
          headerTitle: 'Chọn tài khoản',
          headerRight: () => (
          <TouchableOpacity onPress={() => router.push('/payments')}>
            <TabBarIcon name='add' />
          </TouchableOpacity>
        )}}
      />
      <Stack.Screen name="addBankAccount" options={{
        title: "Thêm ngân hàng mới",
        headerLeft: () => (
          <TouchableOpacity onPress={cancelAddBankAccount}>
            <Text style={{...color.textBlue500, ...styleText.text}}>Huỷ</Text>
          </TouchableOpacity>
        )
      }} />
      <Stack.Screen name="paymentSuccess" options={{
        title: "Thanh toán thành công",
        headerLeft: () => (
          <TouchableOpacity onPress={cancelAddBankAccount}>
            <TabBarIcon name="home" color={pictonBlue[900]} size={30} />
          </TouchableOpacity>
        )
      }} />
    </Stack>
  )
}