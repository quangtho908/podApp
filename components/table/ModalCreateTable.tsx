import { transparent, white } from "@/constants/Pallete";
import color from "@/styles/color";
import styleText from "@/styles/text";
import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import useModalTable, {ModalTableType} from "./services/modalTable";
import { useEffect, useState} from "react";
import { TextInput } from "react-native-gesture-handler";
import setTableService from "@/service/tables/setTable";
import merchantService from "@/service/merchant/merchantStore";
import { postRequest } from "@/apis/common";

export default function ModalCreateTable() {
  const {setModal, setProps, modals} = useModalTable()
  const [name, setName] = useState("")
  const {table, update, destroy} = setTableService()
  const {currentMerchant} = merchantService()
  useEffect(() => {
    if(currentMerchant !== null) {
      setModal(ModalTableType.Create);
      table.merchantId = currentMerchant;
      update(table)
    }
  }, [])

  const cancel = () => {
    setProps(ModalTableType.Create, {
      table: modals.get(ModalTableType.Create)?.table,
      visible: false
    })
  }

  const confirm = async () => {
    table.name = name
    update(table)
    const response = await postRequest("tables", table)
    if(response.status !== 201) {
      return;
    }
    destroy()
    setProps(ModalTableType.Create, {
      table: modals.get(ModalTableType.Create)?.table,
      visible: false
    })
  }
  
  return (
    <Modal
      animationType="fade"
      visible={modals.get(ModalTableType.Create)?.visible}
      transparent={true}
      onRequestClose={cancel}
    >
      <TouchableOpacity
        style={styles.container}
        onPressOut={cancel}
      >
        <TouchableOpacity activeOpacity={1} style={styles.view}>
          <View style={{...styles.title}}>
            <TouchableOpacity onPress={cancel}>
              <Text style={{...styleText.text, ...color.textRed500}}>Huỷ</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={confirm}>
              <Text style={{...styleText.text, ...color.textBlue500}}>Xác nhận</Text>
            </TouchableOpacity>
          </View>
          <Text style={{paddingHorizontal: 20, paddingTop: 10}}>Thêm bàn mới</Text>
          <View style={{padding: 20, gap: 10}}>
            <Text>Tên bàn</Text>
            <TextInput style={styles.input} onChangeText={(newText) => setName(newText)} />
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
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
    justifyContent: 'flex-end',
    backgroundColor: transparent[50],
    flex: 1,
    gap: 10,
  },
  view: {
    backgroundColor: white[50],
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: white[400]
  }
})