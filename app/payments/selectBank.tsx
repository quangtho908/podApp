import { View, Text, StyleSheet } from "react-native";
import styleText from "@/styles/text";
import { white } from "@/constants/Pallete";
import BankSelectItem from "@/components/payment/BankSelectItem";
import ResetOnPullToRefresh from "@/components/ResetOnPullRequest";
import bankAccountService from "@/service/bankAccounts/bankAccountsStore";
import _ from "lodash";
import { useEffect } from "react";
import merchantService from "@/service/merchant/merchantStore";

export default function ModalSelectBank() {
  const {bankAccounts, currentBankAccount, filter} = bankAccountService();
  const {currentMerchant} = merchantService()

  useEffect(() => {
    filter(currentMerchant)
  },)

  return (
    <View>
      <View style={{margin: 'auto', paddingVertical: 15}}>
        <Text style={{...styleText.textTitle, textAlign: 'center'}} >Chọn ngân hàng</Text>
      </View>
      <ResetOnPullToRefresh contentContainerStyle={styles.container}>
        {currentBankAccount.id > 0 && <BankSelectItem bankAccount={currentBankAccount} />}
        {bankAccounts.map(bankAccount => bankAccount.id !== currentBankAccount.id && <BankSelectItem bankAccount={bankAccount} key={bankAccount.id} />)}
      </ResetOnPullToRefresh>
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
    padding: 20
  }
})