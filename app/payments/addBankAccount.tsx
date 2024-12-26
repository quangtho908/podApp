import { View, Text, StyleSheet, TouchableOpacity, Image, Button } from "react-native";
import styleText from "@/styles/text";
import { useRouter } from "expo-router";
import { white } from "@/constants/Pallete";
import BankSelectItem from "@/components/payment/BankSelectItem";
import ResetOnPullToRefresh from "@/components/ResetOnPullRequest";
import bankService from "@/service/banks/bankService";
import { useEffect, useState } from "react";
import useModalBank from "@/components/payment/services/modalBank";
import ModalChooseBank from "@/components/payment/ModalChooseBank";
import Input from "@/components/Input";
import { getRequest, postRequest } from "@/apis/common";
import merchantService from "@/service/merchant/merchantStore";
import bankAccountService from "@/service/bankAccounts/bankAccountsStore";
import { AxiosResponse } from "axios";

export default function AddBankAccount() {
  const router = useRouter();
  const {get, currentBank, resetCurrentBank} = bankService()
  const [accountNumber, setAccountNumber] = useState("") 
  const [accountName, setAccountName] = useState("")
  const {setProps} = useModalBank()
  const {currentMerchant} = merchantService()
  const {filter} = bankAccountService()
  useEffect(() => {
    get()
  }, [])

  const confirm = async () => {
    const response = await postRequest("bankAccounts", {
      merchantId: currentMerchant,
      bankBin: currentBank?.bin,
      accountNumber,
      accountName
    })
    if(response.status !== 200) {
      return;
    }
    await filter(currentMerchant)
    resetCurrentBank()
    router.back();
  }

  const accountNumberBlur = async () => {
    // if(!currentBank?.lookupSupported) {
    //   return;
    // }
    // const response = await postRequest("banks", {
    //   bin: currentBank.bin,
    //   accountNumber
    // })
    // console.log(response)

    // if(response.status !== 200) {
    //   return
    // }

    // setAccountName((response as AxiosResponse).data.accountName)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.selectionBanks} onPress={() => setProps("chooseBank", {visible: true})}>
        {currentBank !== null && <Image style={styles.bankImage} source={{uri: currentBank.logo}} />}
        <Text>{currentBank !== null ? currentBank.shortName : "Chọn ngân hàng"}</Text>
      </TouchableOpacity>
      <Input placeholder="Số tài khoản" onChangeText={setAccountNumber} onBlur={accountNumberBlur} />
      <Input placeholder="Tên tài khoản" onChangeText={setAccountName} value={accountName} />
      <Button title="Xác nhận" onPress={confirm} />
      <ModalChooseBank />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    padding: 20
  },
  selectionBanks: {
    backgroundColor: white[50],
    padding: 10,
    borderRadius: 5,
    flexDirection: "row"
  },
  bankImage: {
    width: 50
  }
})