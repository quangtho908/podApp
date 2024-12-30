import { pictonBlue, white } from "@/constants/Pallete";
import { View,  StyleSheet, TouchableOpacity, Text, Alert } from "react-native";
import OrderTypeBtn from "./OrderTypeBtn";
import { TabBarIcon } from "../navigation/TabBarIcon";
import ModalChooseTable from "../table/ModalChooseTable";
import styleText from "@/styles/text";
import color from "@/styles/color";
import useModalChooseTable from "@/service/modalChooseTable";
import setOrderService from "@/service/orders/setOrder";
import Input from "../Input";
import { useEffect, useState } from "react";
import { getRequest, postRequest } from "@/apis/common";
import { useNavigation, useRouter } from "expo-router";
import { ResponseError } from "@/apis/model";
import orderService from "@/service/orders/orderStore";
import merchantService from "@/service/merchant/merchantStore";
import { AxiosResponse } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ModalOrder() {
  const setModalChooseTable = useModalChooseTable(state => state.setVisible)
  const [note, setNote] = useState("")
  const {currentTable, order, update, destroy} = setOrderService()
  const [isError, setIsError] = useState(false)
  const [isTakeOut, setIsTakeOut] = useState(false)
  const {setCurrentOrder} = orderService();
  const {currentMerchant} = merchantService()
  const [error, setError] = useState({
    title: "",
    message: "",
  })
  const navigation = useNavigation();
  const router = useRouter()
  const onNoteChange = (newText: string) => {
    setNote(newText)
  }

  const placeTable = async () => {
    order.note = note;
    update(order)
    const response = await postRequest("orders", order);
    if(response.status === 200) {
      destroy();
      navigation.goBack();
      return;
    }else if(response.status === 401) {
      router.replace("/")
      return
    }
    setIsError(true);
    setError({
      title: "Lỗi tạo đơn hàng",
      message: (response as ResponseError).response?.data.message || ""
    })
  }

  const payments = async () => {
    order.note = note;
    if(isTakeOut) order.isTakeOut = isTakeOut;
    update(order)
    const response = await postRequest("orders", order);
    if(response.status === 401) {
      router.replace("/")
      return
    }else if(response.status !== 200) {
      return
    }

    const data = (response as AxiosResponse).data
    const responseOrder = await getRequest<{}>("orders", {
      merchantId: currentMerchant,
      id: data.id
    })
    if(responseOrder.status === 200) {
      setCurrentOrder((responseOrder as AxiosResponse).data)
    }else if(responseOrder.status === 401) {
      await AsyncStorage.clear()
      router.replace("/")
      return;
    }

    router.push("/payments")
    destroy();
    return;
  }

  useEffect(() => {
    if(isError) {
      Alert.alert(error.title, error.message, [
        {text: "Ok", style: "cancel", onPress: () => {
          setIsError(false)
        }},
      ])
    }
  }, [isError, JSON.stringify(error)])

  return (
    <View style={styles.centeredView}>
      <Text>{currentTable == null ? "Chưa chọn bàn" : currentTable.name}</Text>
      <View style={styles.options}>
        <OrderTypeBtn onChange={setIsTakeOut} />
        <TouchableOpacity disabled={order.isTakeOut} onPress={() => setModalChooseTable(true)}>
          <Text style={{...styleText.text, ...(order.isTakeOut ? color.textWhite500 : color.textBlue500)}}>Chọn bàn</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.actionContainer}>
        <TouchableOpacity style={{...styles.actionActive, ...styles.action}} onPress={payments}>
          <TabBarIcon name='card' color={white[50]}/>
          <Text style={{...styleText.text, ...color.textWhite50}}>Thanh Toán</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          disabled={currentTable == null}
          onPress={placeTable}
          style={{...styles.action, ...(currentTable == null ? styles.actionDisable : styles.actionActive)}}
        >
          <TabBarIcon name='wine' color={white[50]}/>
          <Text style={{...styleText.text, ...color.textWhite50}}>Đặt bàn</Text>
        </TouchableOpacity>
      </View>
      <Input placeholder="Ghi chú" onChangeText={onNoteChange} />
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
    gap: 10,
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
    flex: 1,
    alignSelf: 'flex-start',
    padding: 10,
    borderRadius: 5
  },
  actionActive: {
    backgroundColor: pictonBlue[600]
  },
  actionDisable: {
    backgroundColor: white[500]

  },
  actionContainer: {
    flexDirection: 'row',
    gap: 10
  },
});