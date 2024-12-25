import { View, StyleSheet } from "react-native";
import { white } from "@/constants/Pallete";
import ResetOnPullToRefresh from "@/components/ResetOnPullRequest";
import { useEffect } from "react";
import bankService from "@/service/vietQr/bankService";
import bankAccountService from "@/service/bankAccounts/bankAccountsStore";
import merchantService from "@/service/merchant/merchantStore";
import BankAccountItem from "@/components/payment/BankAccountItem";
import ModalActionBankAccount from "@/components/payment/ModalActionBankAccount";

export default function BanlAccounts() {
  const {get} = bankService()
  const {currentMerchant} = merchantService()
  const {bankAccounts, filter, defaultAccount} = bankAccountService()
  useEffect(() => {
    get()
    filter(currentMerchant)
  }, [])

  useEffect(() => {
    filter(currentMerchant)
  }, [JSON.stringify(bankAccounts)])

  return (
    <View>
      <ResetOnPullToRefresh reload={() => filter(currentMerchant)} contentContainerStyle={styles.container}>
        <BankAccountItem bankAccount={defaultAccount} />
        {bankAccounts.map(bankAccount => !bankAccount.primary && <BankAccountItem bankAccount={bankAccount} key={bankAccount.id} />)}
      </ResetOnPullToRefresh>
      <ModalActionBankAccount />
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    borderBottomWidth: 2,
    borderBottomColor: white[200],
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  container: {
    gap: 10,
    padding: 20,
  }
})