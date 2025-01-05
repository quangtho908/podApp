import { transparent, white } from "@/constants/Pallete";
import color from "@/styles/color";
import styleText from "@/styles/text";
import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState} from "react";
import { TextInput } from "react-native-gesture-handler";
import tablesService from "@/service/tables/tablesStore";
import setTableService from "@/service/tables/setTable";
import merchantService from "@/service/merchant/merchantStore";
import { putRequest } from "@/apis/common";
import { useRouter } from "expo-router";
import useModal from "@/service/modal/modal";
import Toast from "react-native-toast-message";

export default function ModalEditTable() {
  const {modals, setVisible} = useModal()
  const {currentTable, resetCurrentTable} = tablesService()
  const {table, update, destroy} = setTableService()
  const {currentMerchant} = merchantService()
  const [name, setName] = useState(currentTable.name);
  const router = useRouter()
  useEffect(() => {
    if(currentMerchant !== null) {
      table.merchantId = currentMerchant;
      table.name = table.name;
      update(table)
    }
  }, [JSON.stringify(currentTable)])

  const cancel = () => {
    destroy()
    resetCurrentTable()
    setVisible("edit_table", false)
  }

  const confirm = async () => {
    table.name = name;
    update(table)
    const response = await putRequest(`tables/${currentTable.id}`, table)
    if(response.status === 401) {
      router.replace("/")
      return
    }else if(response.status !== 200) {
      Toast.show({
        type: "error",
        text1: "Không thể chỉnh sử bàn",
        text2: "Bàn đã bị xoá"
      })
      return
    }

    destroy()
    resetCurrentTable()
    setVisible("edit_table", false)
  }
  
  return (
    <Modal
      animationType="fade"
      visible={modals.get("edit_table")?.visible || false}
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
          <Text style={{paddingHorizontal: 20, paddingTop: 10}}>Chỉnh sửa bàn</Text>
          <View style={{padding: 20, gap: 10}}>
            <Text>{currentTable.name}</Text>
            <TextInput style={styles.input} placeholder={currentTable.name} onChangeText={(text) => setName(text)} />
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