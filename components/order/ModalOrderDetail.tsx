import { white } from "@/constants/Pallete";
import color from "@/styles/color";
import styleText from "@/styles/text";
import { Modal, View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import ResetOnPullToRefresh from "../ResetOnPullRequest";
import useModalOrderDetail from "@/service/modalOrderDetail";
import CardProductOrder from "../product/CardProductOrder";

export default function ModalOrderDetail() {
  const visible = useModalOrderDetail(state => state.visible)
  const setVisible = useModalOrderDetail(state => state.setVisible)
  return (
    <Modal
      animationType="slide"
      visible={visible}
    >
      <View style={{...styles.title}}>
        <Text style={{...styleText.textTitle}}>Đơn hàng</Text>
        <TouchableOpacity onPress={() => setVisible(false)}>
          <Text style={{...styleText.text, ...color.textBlue500}}>Huỷ</Text>
        </TouchableOpacity>
      </View>
      <ResetOnPullToRefresh contentContainerStyle={styles.container}>
        <CardProductOrder amount={1} state={true} />
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