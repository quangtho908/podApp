import { transparent, white } from "@/constants/Pallete";
import color from "@/styles/color";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { deleteRequest, putRequest } from "@/apis/common";
import merchantService from "@/service/merchant/merchantStore";
import bankAccountService from "@/service/bankAccounts/bankAccountsStore";
import { useRouter } from "expo-router";
import useModal from "@/service/modal/modal";

export default function ModalActionBankAccount() {
  const {setVisible, modals} = useModal()
  const {currentBankAccount, resetCurrentBankAccount} = bankAccountService()
  const {currentMerchant} = merchantService()
  const router = useRouter()

  const cancel = () => {
    resetCurrentBankAccount()
    setVisible("action_account_bank", false)
  }

  const onDelete = async () => {
    setVisible("action_account_bank", false)
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
    setVisible("action_account_bank", false)
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
      visible={modals.get("action_account_bank")?.visible || false}
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