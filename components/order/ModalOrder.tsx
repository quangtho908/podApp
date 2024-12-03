import { pictonBlue, white } from "@/constants/Pallete";
import { View,  StyleSheet, Button, TouchableOpacity, Text } from "react-native";
import OrderTypeBtn from "./OrderTypeBtn";
import { TabBarIcon } from "../navigation/TabBarIcon";
import { useState } from "react";
import ModalChooseTable from "../table/ModalChooseTable";
import styleText from "@/styles/text";
import color from "@/styles/color";
import useModalChooseTable from "@/service/modalChooseTable";

export default function ModalOrder() {
  const setModalChooseTable = useModalChooseTable(state => state.setVisible)
  const [table, setTable] = useState('Chưa chọn bàn')
  return (
    <View style={styles.centeredView}>
      <Text>Chưa chọn bàn</Text>
      <View style={styles.options}>
        <OrderTypeBtn />
        <TouchableOpacity onPress={() => setModalChooseTable(true)}>
          <Text style={{...styleText.text, ...color.textBlue500}}>Chọn bàn</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.action}>
          <TabBarIcon name='card' color={white[50]}/>
          <Text style={{...styleText.text, ...color.textWhite50}}>Thanh Toán</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.action}>
          <TabBarIcon name='wine' color={white[50]}/>
          <Text style={{...styleText.text, ...color.textWhite50}}>Đặt bàn</Text>
        </TouchableOpacity>
      </View>
      <ModalChooseTable />
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    backgroundColor: white[50],
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: pictonBlue[600],
    flex: 1,
    alignSelf: 'flex-start',
    padding: 10,
    borderRadius: 5
  },
  actionContainer: {
    flexDirection: 'row',
    gap: 10
  },
});