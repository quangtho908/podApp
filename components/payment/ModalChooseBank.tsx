import { white } from "@/constants/Pallete";
import color from "@/styles/color";
import styleText from "@/styles/text";
import { Modal, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { TabBarIcon } from "../navigation/TabBarIcon";
import useModalConfirmPayment from "@/service/modalConfirmPayment";
import { useEffect } from "react";
import useModalBank from "./services/modalBank";
import bankService from "@/service/banks/bankService";
import BankItem from "./BankItem";
import ResetOnPullToRefresh from "../ResetOnPullRequest";
import Input from "../Input";

export default function ModalChooseBank() {
  const {setModal, setProps, modals} = useModalBank()
  const {banks, get, filter} = bankService()
  useEffect(() => {
    setModal("chooseBank")
    get()
  }, [])

  const cancel = () => {
    setProps("chooseBank", {visible: false})
  }

  return (
    <Modal
      visible={modals.get("chooseBank")?.visible}
    >
      <View style={{...styles.title}}>
        <Text style={{...styleText.textTitle}}>Chọn bàn</Text>
        <TouchableOpacity onPress={cancel}>
          <Text style={{...styleText.text, ...color.textBlue500}}>Huỷ</Text>
        </TouchableOpacity>
      </View>
      <View style={{paddingHorizontal: 10}}>
        <Input placeholder="Tìm ngân hàng" onChangeText={filter} />
        <ResetOnPullToRefresh contentContainerStyle={styles.container}>
          {banks.map(bank => <BankItem bank={bank} key={bank.id} />)}
        </ResetOnPullToRefresh>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  title: {
    borderBottomWidth: 2,
    borderBottomColor: white[200],
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  container: {
    paddingBottom: 150,
    paddingTop: 20,
    alignItems: 'stretch',
    gap: 10,
    paddingHorizontal: 5
  },
  view: {
    padding: 20,
    backgroundColor: white[50],
    gap: 15,
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
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  action: {
    alignItems: 'center',
    gap: 10
  },
  qr: {
    width: 300,
    height: 300,
    resizeMode: 'stretch'
  }
})