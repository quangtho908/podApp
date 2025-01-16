import { View, Text, StyleSheet, TouchableOpacity, Image, Button } from "react-native";
import { useRouter } from "expo-router";
import { white } from "@/constants/Pallete";
import bankService from "@/service/banks/bankService";
import { useEffect, useState } from "react";
import ModalChooseBank from "@/components/payment/ModalChooseBank";
import Input from "@/components/common/Input";
import { postRequest } from "@/apis/common";
import merchantService from "@/service/merchant/merchantStore";
import bankAccountService from "@/service/bankAccounts/bankAccountsStore";
import useModal from "@/service/modal/modal";
import { AxiosResponse } from "axios";
import useSpinner from "@/service/spinner";
import Toast from "react-native-toast-message";
import _ from "lodash";

export default function AddBankAccount() {
  const router = useRouter();
  const {get, currentBank, resetCurrentBank} = bankService()
  const [accountNumber, setAccountNumber] = useState("") 
  const [accountName, setAccountName] = useState("")
  const {setVisible} = useModal()
  const {currentMerchant} = merchantService()
  const {filter, unauth, setUnauth} = bankAccountService()
  const {setVisible: setSpinner} = useSpinner();
  const [disabelName, setDisableName] = useState(false)
  useEffect(() => {
    get()
  }, [])

  useEffect(() => {
    setDisableName(false)
    setAccountName("")
    setAccountNumber("")
  }, [JSON.stringify(currentBank)])

  const confirm = async () => {
    const response = await postRequest("bankAccounts", {
      merchantId: currentMerchant,
      bankBin: currentBank?.bin,
      accountNumber,
      accountName
    })
    if(response.status === 401) {
      router.replace("/")
      return;
    } else if(response.status !== 200) {
      return;
    }
    await filter(currentMerchant)
    if(unauth) {
      setUnauth(false)
      router.replace("/")
      return
    }
    resetCurrentBank()
    router.back();
  }

  const onChageAccountNumber = (text: string) => {
    setDisableName(false)
    setAccountNumber(text)
  }

  const accountNumberBlur = async () => {
    setSpinner(true)
    if(!currentBank?.lookupSupported) {
      setDisableName(false);
      setSpinner(false)
      return;
    }
    const response = await postRequest("banks", {
      bank: currentBank.code,
      account: accountNumber
    })
    if(response.status === 401) {
      setSpinner(false)
      router.replace("/")
      return
    }else if(response.status !== 200) {
      Toast.show({
        type: "error",
        text1: "Số tài khoản bị sai hoặc không tồn tại"
      })
      setSpinner(false)
      return
    }
    setSpinner(false)
    setAccountName((response as AxiosResponse).data.ownerName)
    setDisableName(true)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.selectionBanks} onPress={() => setVisible("choose_bank", true)}>
        {currentBank !== null && <Image style={styles.bankImage} source={{uri: currentBank.logo}} />}
        <Text>{currentBank !== null ? currentBank.shortName : "Chọn ngân hàng"}</Text>
      </TouchableOpacity>
      <Input placeholder="Số tài khoản" onChangeText={onChageAccountNumber} onBlur={accountNumberBlur} value={accountNumber} />
      <Input placeholder="Tên tài khoản" onChangeText={setAccountName} value={accountName} readOnly={disabelName} />
      <Button title="Xác nhận" onPress={confirm} disabled={_.isEmpty(accountNumber)} />
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