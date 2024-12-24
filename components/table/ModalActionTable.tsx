import { transparent, white } from "@/constants/Pallete";
import color from "@/styles/color";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import useModalTable, { ModalTableType } from "./services/modalTable";
import { useEffect, useState } from "react";
import { deleteRequest } from "@/apis/common";
import tablesService from "@/service/tables/tablesStore";
import merchantService from "@/service/merchant/merchantStore";

export default function ModalActionTable() {
  const {setModal, setProps, modals} = useModalTable()
  const {currentTable, resetCurrentTable} = tablesService()
  const {currentMerchant} = merchantService()
  useEffect(()=> {
    setModal(ModalTableType.Action);
  }, [])

  const cancel = () => {
    resetCurrentTable()
    setProps(ModalTableType.Action, {
      table: modals.get(ModalTableType.Action)?.table,
      visible: false
    })
  }

  const onDelete = async () => {
    if(currentMerchant === null) return;
    const response = await deleteRequest(`tables/${currentTable.id}`, {
      merchantId: currentMerchant
    })
    if(response.status === 200) {

    }
    resetCurrentTable()
    setProps(ModalTableType.Action, {
      table: modals.get(ModalTableType.Action)?.table,
      visible: false
    })
  }

  return (
    <Modal
      visible={modals.get(ModalTableType.Action)?.visible}
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