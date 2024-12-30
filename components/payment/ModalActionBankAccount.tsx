import { transparent, white } from "@/constants/Pallete";
import color from "@/styles/color";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useEffect } from "react";
import { deleteRequest, putRequest } from "@/apis/common";
import merchantService from "@/service/merchant/merchantStore";
import useModalBank from "./services/modalBank";
import bankAccountService from "@/service/bankAccounts/bankAccountsStore";
import { useRouter } from "expo-router";

export default function ModalActionBankAccount() {
  const {setModal, setProps, modals} = useModalBank()
  const {currentBankAccount, resetCurrentBankAccount} = bankAccountService()
  const {currentMerchant} = merchantService()
  const router = useRouter()
  useEffect(()=> {
    setModal("actionAccountBank");
  }, [])

  const cancel = () => {
    resetCurrentBankAccount()
    setProps("actionAccountBank", {
      visible: false
    })
  }

  const onDelete = async () => {
    setProps("actionAccountBank", {
      visible: false
    })
    if(currentMerchant === null) return;
    const response = await deleteRequest(`bankAccounts/${currentBankAccount.id}`, {
      merchantId: currentMerchant
    })
    if(response.status === 401) {
      router.replace("/")
      return
    }else if(response.status !== 200) {

    }
    resetCurrentBankAccount()
  }

  const onSetDefault = async () => {
    setProps("actionAccountBank", {
      visible: false
    })
    const response = await putRequest(`bankAccounts/${currentBankAccount.id}?merchantId=${currentMerchant}`, {})
    if(response.status === 401) {
      router.replace("/")
      return
    }else if(response.status !== 200) {
    }
    resetCurrentBankAccount()
  }

  return (
    <Modal
      visible={modals.get("actionAccountBank")?.visible}
      animationType="fade"
      onRequestClose={cancel}
      transparent={true}
    >
      <TouchableOpacity 
        style={styles.container}
        onPressOut={cancel}
      >
        <View style={styles.view}>
          <TouchableOpacity style={styles.action} onPress={onSetDefault}>
            <Text>Đặt làm mặc định</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.view}>
          <TouchableOpacity style={styles.action} onPress={onDelete}>
            <Text style={{...color.textRed500}}>Xoá</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: transparent[50],
    paddingHorizontal: 20
  },
  view: {
    backgroundColor: white[50],
    bottom: 0,
    borderRadius: 5,
    shadowColor: white[800],
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  action: {
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: white[50],
    padding: 20
  }
})