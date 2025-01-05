import { transparent, white } from "@/constants/Pallete";
import color from "@/styles/color";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { deleteRequest } from "@/apis/common";
import tablesService from "@/service/tables/tablesStore";
import merchantService from "@/service/merchant/merchantStore";
import { useRouter } from "expo-router";
import useModal from "@/service/modal/modal";

export default function ModalActionTable() {
  const {modals, setVisible} = useModal()
  const {currentTable, resetCurrentTable} = tablesService()
  const {currentMerchant} = merchantService()
  const router = useRouter()

  const cancel = () => {
    resetCurrentTable()
    setVisible("action_table", false)
  }

  const onDelete = async () => {
    if(currentMerchant === null) return;
    setVisible("action_table", false)
    const response = await deleteRequest(`tables/${currentTable.id}`, {
      merchantId: currentMerchant
    })
    if(response.status === 401){
      router.replace("/")
      return
    }else if(response.status !== 200) {

    }
    resetCurrentTable()
  }

  return (
    <Modal
      visible={modals.get("action_table")?.visible || false}
      animationType="fade"
      onRequestClose={cancel}
      transparent={true}
    >
      <TouchableOpacity 
        style={styles.container}
        onPressOut={cancel}
      >
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