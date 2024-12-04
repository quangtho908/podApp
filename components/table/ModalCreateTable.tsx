import { transparent, white } from "@/constants/Pallete";
import color from "@/styles/color";
import styleText from "@/styles/text";
import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import useModalTable, {ModalType} from "./services/modalTable";
import { useEffect} from "react";
import { TextInput } from "react-native-gesture-handler";

export default function ModalCreateTable() {
  const {setModal, setProps, modals} = useModalTable()
  useEffect(() => {
    setModal(ModalType.Create);
  }, [])

  const cancel = () => {
    setProps(ModalType.Create, {
      table: modals.get(ModalType.Create)?.table,
      visible: false
    })
  }

  const confirm = () => {
    setProps(ModalType.Create, {
      table: modals.get(ModalType.Create)?.table,
      visible: false
    })
  }
  
  return (
    <Modal
      animationType="fade"
      visible={modals.get(ModalType.Create)?.visible}
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
            <TextInput style={styles.input} />
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