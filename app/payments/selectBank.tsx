import { View, Text, StyleSheet } from "react-native";
import styleText from "@/styles/text";
import { white } from "@/constants/Pallete";
import BankSelectItem from "@/components/payment/BankSelectItem";
import ResetOnPullToRefresh from "@/components/ResetOnPullRequest";
import bankAccountService from "@/service/bankAccounts/bankAccountsStore";
import _ from "lodash";
import { useEffect } from "react";
import merchantService from "@/service/merchant/merchantStore";
import { useRouter } from "expo-router";

export default function ModalSelectBank() {
  const {bankAccounts, currentBankAccount, filter, unauth, setUnauth} = bankAccountService();
  const {currentMerchant} = merchantService()
  const router = useRouter()
  useEffect(() => {
    reloadAccount()
  },[])

  const reloadAccount = async () => {
    await filter(currentMerchant)
    if(unauth) {
      setUnauth(false)
      router.replace("/")
      return
    }
  }

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