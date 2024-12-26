import { white } from "@/constants/Pallete";
import bankAccountService, { BankAccount } from "@/service/bankAccounts/bankAccountsStore";
import bankService from "@/service/banks/bankService";
import styleText from "@/styles/text";
import * as _ from "lodash";
import { StyleSheet, TouchableOpacity, Image, Text, View } from "react-native";
import useModalBank from "./services/modalBank";
import color from "@/styles/color";

export default function BankAccountItem({bankAccount}: {bankAccount: BankAccount}) {
  const {setProps} = useModalBank()
  const {setCurrentBankAccount} = bankAccountService()
  const onChoose = () => {
    setCurrentBankAccount(bankAccount)
    setProps("actionAccountBank", {visible: true})
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
        {bankAccount.primary && <Text style={{...color.textGreen500}}>Mặc định</Text>}
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