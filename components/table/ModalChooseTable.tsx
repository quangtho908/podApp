import { white } from "@/constants/Pallete";
import color from "@/styles/color";
import styleText from "@/styles/text";
import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ResetOnPullToRefresh from "../common/ResetOnPullRequest";
import ChooseTableItem from "./ChooseTableItem";
import { useEffect } from "react";
import tablesService from "@/service/tables/tablesStore";
import merchantService from "@/service/merchant/merchantStore";
import { useRouter } from "expo-router";
import useModal from "@/service/modal/modal";

export default function ModalChooseTable() {
  const {setVisible, modals} = useModal()
  const {tables, filter, unauth, setUnauth} = tablesService()
  const {currentMerchant} = merchantService()
  const router = useRouter()
  useEffect(() => {
    reload()
  }, []);

  const reload = async () => {
    await filter({merchantId: currentMerchant})
    if(unauth) {
      setUnauth(false)
      router.replace("/")
      return
    }
  }

  return (
    <Modal
      animationType="slide"
      visible={modals.get("choose_table")?.visible || false}
    >
      <View style={{...styles.title}}>
        <Text style={{...styleText.textTitle}}>Chọn bàn</Text>
        <TouchableOpacity onPress={() => setVisible("choose_table",false)}>
          <Text style={{...styleText.text, ...color.textBlue500}}>Huỷ</Text>
        </TouchableOpacity>
      </View>
      <ResetOnPullToRefresh contentContainerStyle={styles.container} reload={reload}>
        {tables.map(table => <ChooseTableItem key={table.id} {...table} />)}
      </ResetOnPullToRefresh>
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
    paddingVertical: 20
  }
})