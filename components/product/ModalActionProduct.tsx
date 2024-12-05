import { transparent, white } from "@/constants/Pallete";
import color from "@/styles/color";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import useModalProduct, { ModalProductType } from "./services/modalProduct";

export default function ModalActionProduct() {
  const {setModal, setProps, modals} = useModalProduct()
  useEffect(()=> {
    setModal(ModalProductType.Action);
  }, [])

  const cancel = () => {
    setProps(ModalProductType.Action, {
      product: modals.get(ModalProductType.Action)?.product,
      visible: false
    })
  }

  return (
    <Modal
      visible={modals.get(ModalProductType.Action)?.visible}
      animationType="fade"
      onRequestClose={cancel}
      transparent={true}
    >
      <TouchableOpacity 
        style={styles.container}
        onPressOut={cancel}
      >
        <View style={styles.view}>
          <TouchableOpacity style={styles.action}>
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