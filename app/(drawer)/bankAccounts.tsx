import { View, StyleSheet } from "react-native";
import { white } from "@/constants/Pallete";
import ResetOnPullToRefresh from "@/components/ResetOnPullRequest";
import { useEffect } from "react";
import bankService from "@/service/banks/bankService";
import bankAccountService from "@/service/bankAccounts/bankAccountsStore";
import merchantService from "@/service/merchant/merchantStore";
import BankAccountItem from "@/components/payment/BankAccountItem";
import ModalActionBankAccount from "@/components/payment/ModalActionBankAccount";
import { useRouter } from "expo-router";

export default function BankAccounts() {
  const {get} = bankService()
  const {currentMerchant} = merchantService()
  const {
    bankAccounts,
    filter,
    defaultAccount,
    unauth: unauthBankAccount,
    setUnauth: setUnauthBankAccount
  } = bankAccountService()
  const router = useRouter();
  useEffect(() => {
    get()
    loadAccount()
  }, [])

  useEffect(() => {
    loadAccount()
  }, [JSON.stringify(currentMerchant)])

  const loadAccount = async () => {
    await filter(currentMerchant)
    if(unauthBankAccount) {
      setUnauthBankAccount(false)
      router.replace("/")
      return;
    }
  }

  return (
    <View>
      <ResetOnPullToRefresh reload={loadAccount} contentContainerStyle={styles.container}>
        {defaultAccount.id > 0 && <BankAccountItem bankAccount={defaultAccount} />}
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