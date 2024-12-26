import { white } from "@/constants/Pallete";
import bankAccountService, { BankAccount } from "@/service/bankAccounts/bankAccountsStore";
import bankService from "@/service/banks/bankService";
import color from "@/styles/color";
import styleText from "@/styles/text";
import { useRouter } from "expo-router";
import * as _ from "lodash";
import { StyleSheet, TouchableOpacity, Image, Text, View } from "react-native";

export default function BankSelectItem({bankAccount}: {bankAccount: BankAccount}) {
  const router = useRouter();
  const {setCurrentBankAccount, currentBankAccount} = bankAccountService()
  const onChoose = () => {
    setCurrentBankAccount(bankAccount)
    router.back()
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onChoose}>
      <Image 
        style={styles.bankImage}
        source={{
          uri: bankAccount.bank.logo
        }} 
      />
      <View style={{alignItems: 'flex-end', gap: 5}}>
        {currentBankAccount.id === bankAccount.id && <Text style={{...color.textGreen500}}>Đang chọn</Text>}
        <Text style={{...styleText.text}}>{bankAccount.accountName}</Text>
        <Text>{bankAccount.accountNumber}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingRight: 20,
    justifyContent: 'space-between',
    backgroundColor: white[50],
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  bankImage: {
    width: 100,
    height: 40
  },
})