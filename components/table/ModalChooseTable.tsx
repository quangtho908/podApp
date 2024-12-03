import { white } from "@/constants/Pallete";
import color from "@/styles/color";
import styleText from "@/styles/text";
import { Modal, View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import ResetOnPullToRefresh from "../ResetOnPullRequest";
import TableItem from "./TableItem";

export default function ModalChooseTable({visible, setVisible}: {visible: boolean, setVisible: () => void}) {
  return (
    <Modal
      animationType="slide"
      visible={visible}
    >
      <View style={{...styles.title}}>
        <Text style={{...styleText.textTitle}}>Chọn bàn</Text>
        <TouchableOpacity onPress={setVisible}>
          <Text style={{...styleText.text, ...color.textBlue500}}>Huỷ</Text>
        </TouchableOpacity>
      </View>
      <ResetOnPullToRefresh contentContainerStyle={styles.container}>
        <TableItem />
        <TableItem />
        <TableItem />
        <TableItem />
        <TableItem />
      </ResetOnPullToRefresh>
    </Modal>
  )
}

const styles = StyleSheet.create({
  title: {
    borderBottomWidth: 2,
    borderBottomColor: white[200],
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
    paddingVertical: 20
  }
})