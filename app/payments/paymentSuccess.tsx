import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { green, pictonBlue, white } from "@/constants/Pallete";
import bankAccountService from "@/service/bankAccounts/bankAccountsStore";
import orderService from "@/service/orders/orderStore";
import color from "@/styles/color";
import styleText from "@/styles/text";
import { convertPrice } from "@/utils/convertData";
import { useRouter } from "expo-router";
import React from "react";
import { useEffect } from "react";
import { BackHandler, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function PaymentSuccess () {
  const {resetCurrentOrder, currentOrder} = orderService();
  const {resetCurrentBankAccount, currentBankAccount} = bankAccountService()
  const router = useRouter()
  useEffect(() => {
    const backEvent = BackHandler.addEventListener("hardwareBackPress", () => {
      resetCurrentBankAccount()
      resetCurrentOrder()
      router.push("/(drawer)/(tabs)/home") 
      return true
    })

    return () => backEvent.remove();
  }, [])

  const backToHome = () => {
    resetCurrentBankAccount()
    resetCurrentOrder()
    router.push("/(drawer)/(tabs)/home")
  }

  return (
    <View style={styles.container}>
      <TabBarIcon name="checkmark-circle" size={100} color={green[500]}/>
      <Text style={{...styleText.text}}>THANH TOÁN THÀNH CÔNG</Text>
      <Text style={{...styleText.textTitle, ...color.textBlue700}}>{convertPrice(currentOrder.totalPrice)}</Text>
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={{flex: 1, ...styleText.sText}}>Đơn hàng số:</Text>
          <Text style={{flex: 1, textAlign: "right", ...styleText.sText}}>{currentOrder.id}</Text>
        </View>
        {currentBankAccount.id > 0 && (
          <>
            <View style={styles.row}>
              <Text style={{flex: 1, ...styleText.sText}}>Tài khoản thụ hưởng:</Text>
              <Text style={{flex: 1, textAlign: "right", ...styleText.sText}}>{currentBankAccount.accountNumber}</Text>
            </View>
            <View style={styles.row}>
              <Text style={{flex: 1, ...styleText.sText}}>Tên tài khoản:</Text>
              <Text style={{flex: 1, textAlign: "right", ...styleText.sText}}>{currentBankAccount.accountName}</Text>
            </View>
            <View style={styles.row}>
              <Text style={{flex: 1, ...styleText.sText}}>Ngân hàng:</Text>
              <Text style={{flex: 1, textAlign: "right", ...styleText.sText}}>{currentBankAccount.bank.shortName}</Text>
            </View>
          </>
        )}
      </View>
      <TouchableOpacity style={{backgroundColor: pictonBlue[800], ...styles.actionBtn}} onPress={backToHome}>
        <TabBarIcon name="home" color={white[50]} />
        <Text style={{color: white[50], ...styleText.text}}>Tiếp tục phục vụ</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
    gap: 10
  },
  table: {
    gap: 20,
    marginHorizontal: 10,
    backgroundColor: white[50],
    padding: 10,
    borderRadius: 10
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    gap: 10
  }
})